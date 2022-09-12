import { Ionicons } from "@expo/vector-icons";
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import * as Yup from 'yup';
import FilledBtn from "../components/buttons/FilledBtn";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import { Context as AssessmentContext } from "../contexts/AssessmentContext";
import { Context as AuthContext } from "../contexts/AuthContext";

let validateGithub = /^([A-Za-z0-9]+@|http(|s)\:\/\/)([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git)?$/i;

const toastConfig = {
    tomatoToast: ({ text1,props }) => (
        <View
            style={{ height: 120,
                backgroundColor: Colors.borderColor,
                borderRadius:10,
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                opacity:1,
                borderLeftWidth:5,
                borderLeftColor:Colors.warningColor,
                marginHorizontal:16,
                paddingHorizontal:16
            }}>
            <Ionicons name="warning" size={60} color={Colors.warningColor} />
            <Text subtitle1 warningColor>{text1}</Text>
        </View>
    )
};


const WrittenExamQuestionScreen = ({navigation, route}) => {
    const {id} = route.params;
    const {state:{token}} = useContext(AuthContext);
    const [selectedAnswers,setSelectedAnswers] = useState([]);
    const [selection,setSelection] = useState(null);
    const {state:{assessment,quiz},getAssessment,getQuizQuestion,startExam,clearErrorMsg,savedAnswer,savedEvaluation} = useContext(AssessmentContext);
    useEffect(()=>{
        getAssessment(token,id);
    },[token])

    const submitAnswer = () =>{
        savedAnswer({uuid:id,question_id:quiz?.quiz?.id,answers:selectedAnswers},token,()=>{
            setSelectedAnswers([]);
            clearErrorMsg();
        })
    }

    const examSchema = Yup.object().shape({
        gitUrl: Yup.string().matches(validateGithub, 'Github Repo is not valid').required('Required'),
        feedback: Yup.string().required('Required'),

    });

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: examSchema,
        initialValues: {gitUrl: '',feedback: ''},
        onSubmit: (values) => {
            savedEvaluation({assessment_uuid:id,evaluation_url:values.gitUrl,candidate_feedback:values.feedback},()=>{
                clearErrorMsg();
            })
        }
    });

    const validationColor = !touched ? Colors.borderColor : errors?.feedback ? '#FF5A5F' : Colors.borderColor;

    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"Written"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text marginT-20 marginB-10 subtitle1 deepGray>Submit Your Answer</Text>
                    <InputField
                        title={"Your Github url*"}
                        placeholderText={"Your Github url"}
                        keyboardType={'email-address'}
                        autoComplete={"off"}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        spellCheck={false}
                        value={values.gitUrl}
                        onChangeText={handleChange('gitUrl')}
                        onBlur={handleBlur('gitUrl')}
                        error={errors.gitUrl}
                        touched={touched.gitUrl}
                    />

                    <View>
                        <Text marginV-8 text>Your Feedback</Text>
                        <View style={{...styles.textInputStyle,borderColor:validationColor}}>
                            <TextInput
                                placeholder={"\n" +
                                    "1. We like to know how much did you finish\n" +
                                    "\n" +
                                    "2. Please record your final output of the exam and send the video link here.\n" +
                                    "\n" +
                                    "3. If you have queries or questions regarding the test that you attend, feel free to put down here in this feedback box.\n"}
                                keyboardType={"email-address"}
                                autoComplete={"off"}
                                autoCorrect={false}
                                multiline={true}
                                numberOfLines={15}
                                value={values.feedback}
                                onChangeText={handleChange('feedback')}
                                onBlur={handleBlur('feedback')}
                                error={errors.feedback}
                                touched={touched.feedback}
                                style={{
                                    textAlignVertical: 'top',
                                    fontFamily: 'Montserrat_400Regular'
                                }}
                            />
                        </View>
                        {errors.feedback ? (
                            <Text style={{color: 'red'}} marginV-4 text>{errors.feedback}</Text>
                        ) : (
                            <></>
                        )}
                    </View>

                </ScrollView>

                <TouchableOpacity marginV-10 onPress={handleSubmit}>
                    <FilledBtn title={'Submit'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default WrittenExamQuestionScreen;

const styles = StyleSheet.create({
    textInputStyle: {
        borderRadius: 10,
        borderWidth: 1,
        height: 200,
        paddingHorizontal: 16,
        marginBottom: 7,
        paddingVertical:7,
    },

    textInputField:{
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 7,
    }
})