import React, {useContext, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import FilledBtn from "../components/buttons/FilledBtn";
import {
    StatusBar,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    FlatList,
    RefreshControl
} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import BlueOutlineBtn from "../components/buttons/BlueOutlineBtn";
import {Context as AuthContext} from "../contexts/AuthContext";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import useSingleJob from "../hooks/useSingleJob";



let validateLinkedin = /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/;
let validateGithub = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim;
let experience = /^[0-9][0-9]?$|^100$/;
let validateExpSalary = /^(?:[0-9][0-9]{0,6}(?:\.\d{1,2})?|100000|100000.00)$/;

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

const ApplicantInformationScreen = ({navigation, route}) => {
    const {state:{token,errorMessage,loader}, register, login, clearErrorMsg, apply} = useContext(AuthContext);
    const {title, job_slug,registerData,loginData} = route.params;
    const [singleJob] = useSingleJob(job_slug);
    const isIcon = false;
    const [expSalary,setExpSalary] = useState("");
    const [comment,setComment] = useState("");
    const [additionalFields,setAdditionalFields] = useState([singleJob?.additional_fields]);
    const [text, setText] = useState([]);
    //const [isToken,setIsToken] = useState('');
    useEffect(()=>{
        if(token?.length > 0){
            applyProcess();
        }
    },[token])

    //console.log('token ....',token);



    const onChangeValue = () => {

    }
    /*console.log(singleJob?.additional_fields, 'Single job....');

    for(let i = 0;i<singleJob?.additional_fields?.length;i++){
        console.log(singleJob?.additional_fields[i].title, "Additional Fields Title: ");
    }*/

    const applySchema = Yup.object().shape({
        expSalary: Yup.string().matches(validateExpSalary, 'Expected Salary is not valid').required('Required'),
       // linkedin: Yup.string().matches(validateLinkedin, 'Linkedin Profile is not valid').required('Required'),
       // gitUrl: Yup.string().matches(validateGithub, 'Github Profile is not valid').required('Required'),
       // experience: Yup.string().matches(experience, 'Invalid Experience').required('Required'),

    });
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: applySchema,
        initialValues: {expSalary: '',comment: ''},
        onSubmit: (values) => {
                /*const formData = {
                    job_slug,
                    expected_salary: values.expSalary,
                    additional_message: values.comment,
                    additional_fields: text
                }*/
            if(token){
                apply(token,{
                    job_slug,
                    expected_salary: values.expSalary,
                    additional_message: values.comment,
                    additional_fields: text
                }, () => {
                    navigation.navigate('Submission');
                    clearErrorMsg();
                    values.expSalary = "";
                    values.comment = "";
                });
            }else{
                register(registerData,()=> {
                    login(loginData,()=>{
                           applyProcess();

                    });
                })
            }

        }
    });

   /* apply(isToken,{
        job_slug,
        expected_salary: values.expSalary,
        additional_message: values.comment,
        additional_fields: text
    }, () => {
        navigation.navigate('Submission');
        clearErrorMsg();
        values.expSalary = "";
        values.comment = "";
    });*/



    const applyProcess = () => {
        apply(token,{
            job_slug,
            expected_salary: values.expSalary,
            additional_message: values.comment,
            additional_fields: text
        }, () => {
            navigation.navigate('Submission');
            clearErrorMsg();
            values.expSalary = "";
            values.comment = "";
        });
    }


    const validationColor = !touched ? Colors.borderColor : errors?.expSalary ? '#FF5A5F' : Colors.borderColor;
    /*const comValidationColor = !touched ? Colors.borderColor : errors?.comment ? '#FF5A5F' : Colors.borderColor;
    const additionalGitColor  = !touched ? Colors.borderColor : errors?.gitUrl ? '#FF5A5F' : Colors.borderColor;
    const additionalLinkedinColor  = !touched ? Colors.borderColor : errors?.linkedin ? '#FF5A5F' : Colors.borderColor;
    const additionalExpColor  = !touched ? Colors.borderColor : errors?.experience ? '#FF5A5F' : Colors.borderColor;*/

    /*const handleApply = () =>{
        console.log('token in APP',token);

        apply(token,{
            job_slug:job_slug,
            expected_salary: expSalary,
            additional_message: comment,
            additional_fields: text,
        }, () => {
            navigation.navigate('Submission');
            clearErrorMsg();
            setExpSalary("");
            setComment("");
        });
       // console.log(text);
        /!*if(token){
            apply({
                job_slug,
                expected_salary: expSalary,
                additional_message: comment,
                additional_fields: text
            }, () => {
                navigation.navigate('Submission');
                clearErrorMsg();
                setExpSalary("");
                setComment("");
            });
        }else{
            register(registerData,()=> {
                login(loginData);
                apply({
                    job_slug,
                    expected_salary: expSalary,
                    additional_message: comment,
                    additional_fields: text
                }, () => {
                    navigation.navigate('Submission');
                    clearErrorMsg();
                    setExpSalary("");
                    setComment("");
                });
            })
        }*!/
    }*/

    useEffect(() => {
        showToast()
        clearErrorMsg();
    }, [errorMessage?.message])

    const showToast = () => {
        errorMessage?.message && Toast.show({
            type: 'tomatoToast',
            text1: ` ${errorMessage?.message}`
        })
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View flex-1>
                <CommonHeader name="Applicant Information" navigation={navigation}/>
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            </View>

            <View paddingH-16 flex-12>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View flex-8>
                        <Text subtitle4 blue marginB-10>{title}</Text>
                        <View>
                            <Text text gray marginB-20>If already have Mediusware job account then please <Text
                                onPress={() => navigation.navigate('Login')} blue>Login</Text></Text>
                        </View>

                        <View marginB-16>
                            <Text marginB-8 text>What is your expected salary?*</Text>
                            <View row>
                                <View style={{...styles.currencyContainer,borderColor:validationColor}}>
                                    <Text>BDT</Text>
                                </View>
                                <View style={{...styles.salaryContainer,borderColor:validationColor}}>
                                    <TextInput
                                        keyboardType="numeric"
                                        autoCapitalize={"none"}
                                        autoCorrect={false}
                                        autoComplete={"off"}
                                        value={values.expSalary}
                                        onChangeText={handleChange('expSalary')}
                                        onBlur={handleBlur('expSalary')}
                                        error={errors.expSalary}
                                        touched={touched.expSalary}
                                        /*value={expSalary}
                                        onChangeText={setExpSalary}*/
                                        style={{
                                            fontFamily: "Montserrat_400Regular",
                                        }}
                                        placeholder={"Enter Your Expected Salary"}
                                    />
                                </View>
                            </View>
                            {errors.expSalary ? (
                                <Text style={{color: 'red'}} marginV-4 text>{errors.expSalary}</Text>
                            ) : (
                                <></>
                            )}
                        </View>

                      {/*  <FlatList
                            showsVerticalScrollIndicator={false}
                            data={singleJob?.additional_fields}
                            //keyExtractor={(index)=> index}
                            keyExtractor={(item,index)=> item.key}
                            renderItem={({item,index}) => {
                                return <View>
                                            <Text marginV-8 text>{`${item?.title} ${item?.required ? '*':''}`}</Text>
                                            <View style={{...styles.textInputField,borderColor:Colors.borderColor}}>
                                                <TextInput
                                                    autoComplete={"off"}
                                                    autoCorrect={false}
                                                    onChangeText={text=> console.log(text)}
                                                    text={text}
                                                    value={text[index]}
                                                    style={{
                                                        textAlignVertical: 'top',
                                                        fontFamily: 'Montserrat_400Regular'
                                                    }}
                                                />
                                    </View>
                                </View>
                            }}/>*/}

                        {
                            singleJob?.additional_fields?.map((field,index)=>(
                                <View key={index}>
                                    <Text marginV-8 text>{`${field?.title} ${field?.required ? '*':''}`}</Text>
                                    <View style={{...styles.textInputField,borderColor:Colors.borderColor}}>
                                        <TextInput
                                            autoComplete={"off"}
                                            autoCorrect={false}
                                            value={text[index]}
                                            onChangeText={(t) => {
                                                setText((text) => {
                                                    const newText = [...text];
                                                    newText[index] = t;
                                                    return newText;
                                                });
                                            }}
                                            style={{
                                                flex: 1,
                                                fontFamily: "Montserrat_400Regular",
                                            }}
                                        />
                                    </View>
                                </View>
                            ))

                        }
                        <View>
                            <Text marginV-8 text>Do you have anything to say to us?</Text>
                            <View style={{...styles.textInputStyle,borderColor:Colors.borderColor}}>
                                <TextInput
                                    keyboardType="email-address"
                                    autoComplete={"off"}
                                    autoCorrect={false}
                                    value={values.comments}
                                    onChangeText={handleChange('comment')}
                                    onBlur={handleBlur('comment')}
                                    error={errors.comment}
                                    touched={touched.comment}
                                    multiline={true}
                                    numberOfLines={10}
                                    onSubmitEditing={() => handleSubmit()}
                                    value={comment}
                                    onChangeText={setComment}
                                    style={{
                                        textAlignVertical: 'top',
                                        fontFamily: 'Montserrat_400Regular'
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Toast
                    config={toastConfig}
                    visibilityTime={5000}
                    position='top'
                />
                <View row marginV-15>
                    <TouchableOpacity flex-1 marginR-10 onPress={() => navigation.navigate('Apply')}>
                        <BlueOutlineBtn title={'Back'}/>
                    </TouchableOpacity>
                    <TouchableOpacity flex-1 disabled={loader} onPress={handleSubmit} >
                        <FilledBtn title={'Submit'} isLoading={loader}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInputStyle: {
        borderRadius: 10,
        borderWidth: 1,
        height: 100,
        paddingHorizontal: 16,
        marginBottom: 7,
    },
    currencyContainer: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    salaryContainer: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderLeftWidth: 0,
        height: 48,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flex: 6
    },
    textInputField:{
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 7,
    }
})


export default ApplicantInformationScreen;
