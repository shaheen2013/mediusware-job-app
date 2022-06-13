import React, {useContext, useEffect,useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar, ScrollView, TextInput, StyleSheet} from "react-native";
import Point from "../components/ExamProgress/Point";
import ExamCard from "../components/ExamProgress/ExamCard";
import {Context as AuthContext} from "../contexts/AuthContext";
import {Context as AssessmentContext} from "../contexts/AssessmentContext";
import HTMLView from 'react-native-htmlview';
import InputField from "../components/formComponents/InputField";


const WrittenExamQuestionScreen = ({navigation, route}) => {
    const {id} = route.params;
    const {state:{token}} = useContext(AuthContext);
    const [selectedAnswers,setSelectedAnswers] = useState([]);
    const [selection,setSelection] = useState(null);
    const {state:{assessment,quiz},getAssessment,getQuizQuestion,startExam,clearErrorMsg,savedAnswer} = useContext(AssessmentContext);
    console.log(quiz?.quiz);

    useEffect(()=>{
        getAssessment(token,id);
    },[token])

    const submitAnswer = () =>{
        savedAnswer({uuid:id,question_id:quiz?.quiz?.id,answers:selectedAnswers},token,()=>{
            setSelectedAnswers([]);
            //navigation.navigate('Result',{assessment:assessment});
            clearErrorMsg();
        })
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"Written"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 style={{flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HTMLView
                        value={quiz?.quiz?.title}
                        // style={styles}
                    />

                    <Text marginT-20 marginB-10 subtitle1 deepGray>Submit Your Answer</Text>
                    <InputField
                        title={"Your Github url*"}
                        placeholderText={"Your Github url"}
                        keyboardType={'email-address'}
                        autoComplete={"off"}
                        autoCorrect={false}
                        spellCheck={false}
                    />

                    <View>
                        <Text marginV-8 text>Your Feedback</Text>
                        <View style={{...styles.textInputStyle,borderColor:Colors.borderColor}}>
                            <TextInput
                                keyboardType="email-address"
                                autoComplete={"off"}
                                autoCorrect={false}
                                multiline={true}
                                numberOfLines={10}
                                style={{
                                    textAlignVertical: 'top',
                                    fontFamily: 'Montserrat_400Regular'
                                }}
                            />
                        </View>
                    </View>

                </ScrollView>

                <TouchableOpacity marginV-10 onPress={submitAnswer}>
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
        height: 100,
        paddingHorizontal: 16,
        marginBottom: 7,
    },

    textInputField:{
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 7,
    }
})