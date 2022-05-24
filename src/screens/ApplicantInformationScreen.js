import React, {useContext, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import OutlineBtn from "../components/buttons/OutlineBtn";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import BlueOutlineBtn from "../components/buttons/BlueOutlineBtn";
import {Context as AuthContext} from "../contexts/AuthContext";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

let validateLinkedin = /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/;
let validateGithub = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim;
let experience = /^[0-9][0-9]?$|^100$/;
let validateExpSalary = /^(?:[0-9][0-9]{0,6}(?:\.\d{1,2})?|100000|100000.00)$/;
const applySchema = Yup.object().shape({
    expSalary: Yup.string().matches(validateExpSalary, 'Expected Salary is not valid').required('Required'),
    linkedin: Yup.string().matches(validateLinkedin, 'Linkedin Profile is not valid').required('Required'),
    gitUrl: Yup.string().matches(validateGithub, 'Github Profile is not valid').required('Required'),
    experience: Yup.string().matches(experience, 'Invalid Experience').required('Required'),
    comments: Yup.string().required('Required')
});

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
    const {state, register, login, clearErrorMsg, apply} = useContext(AuthContext);
    const {title, job_slug} = route.params;
    const isIcon = false;
    console.log("apply error: ",state.errorMessage.message);
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: applySchema,
        initialValues: {expSalary: '', experience: '', gitUrl: '', linkedin: '',comments: ''},
        onSubmit: (values) => {
            apply({
                job_slug,
                expected_salary: values.expSalary,
                additional_message: values.comments || "",
                additional_fields: [values.gitUrl,values.experience, values.linkedin]
            }, () => {
                navigation.navigate('Submission');
                clearErrorMsg();
                values.expSalary = "";
                values.experience = "";
                values.gitUrl = "";
                values.linkedin = "";
                values.comments = "";
            });

        }
    });
    const validationColor = !touched ? Colors.borderColor : errors?.expSalary ? '#FF5A5F' : Colors.borderColor;
    const comValidationColor = !touched ? Colors.borderColor : errors?.comments ? '#FF5A5F' : Colors.borderColor;

    useEffect(() => {
        showToast()
        clearErrorMsg();
    }, [state?.errorMessage?.message])

    const showToast = () => {
        state?.errorMessage?.message && Toast.show({
            type: 'tomatoToast',
            text1: ` ${state?.errorMessage?.message}`
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
                                <View style={{...styles.currencyContainer, borderColor: validationColor}}>
                                    <Text>BDT</Text>
                                </View>
                                <View style={{...styles.salaryContainer,borderColor: validationColor}}>
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
                        <InputField
                            keyboardType="numeric"
                            title={"Professional Experience (Years)*"}
                            autoComplete={"off"}
                            autoCorrect={false}
                            value={values.experience}
                            onChangeText={handleChange('experience')}
                            onBlur={handleBlur('experience')}
                            error={errors.experience}
                            touched={touched.experience}

                        />
                        <InputField
                            title={'GitHub URL*'}
                            autoComplete={"off"}
                            autoCorrect={false}
                            value={values.gitUrl}
                            onChangeText={handleChange('gitUrl')}
                            onBlur={handleBlur('gitUrl')}
                            error={errors.gitUrl}
                            touched={touched.gitUrl}

                        />
                        <InputField
                            title={'Linkedin'}
                            autoComplete={"off"}
                            autoCorrect={false}
                            value={values.linkedin}
                            onChangeText={handleChange('linkedin')}
                            onBlur={handleBlur('linkedin')}
                            error={errors.linkedin}
                            touched={touched.linkedin}
                        />
                        <View>
                            <Text marginB-8 text>Do you have anything to say to us?</Text>
                            <View style={{...styles.textInputStyle,borderColor:comValidationColor}}>
                                <TextInput
                                    autoComplete={"off"}
                                    autoCorrect={false}
                                    value={values.comments}
                                    onChangeText={handleChange('comments')}
                                    onBlur={handleBlur('comments')}
                                    error={errors.comments}
                                    touched={touched.comments}
                                    multiline={true}
                                    numberOfLines={10}
                                    onSubmitEditing={() => handleSubmit()}
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
                    <TouchableOpacity flex-1 disabled={state?.loader} onPress={handleSubmit} >
                        <FilledBtn title={'Submit'} isLoading={state?.loader}/>
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
    }
})


export default ApplicantInformationScreen;
