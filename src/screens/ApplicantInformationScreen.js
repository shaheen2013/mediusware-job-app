import React, {useContext, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import OutlineBtn from "../components/buttons/OutlineBtn";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView} from "react-native";
import {Feather} from "@expo/vector-icons";
import BlueOutlineBtn from "../components/buttons/BlueOutlineBtn";
import {Context as AuthContext} from "../contexts/AuthContext";
import {useFormik} from 'formik';
import * as Yup from 'yup';

let validateLinkedin = /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/;
let validateGithub = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim;
let experience = /^[0-9]$/;
const applySchema = Yup.object().shape({
    expSalary: Yup.string().required('Required'),
    linkedin: Yup.string().matches(validateLinkedin, 'Linkedin Profile is not valid').required('Required'),
    gitUrl: Yup.string().matches(validateGithub, 'Github Profile is not valid').required('Required'),
    experience: Yup.string().matches(experience, 'Invalid Experience').required('Required'),
    comments: Yup.string().required('Required')
});

const ApplicantInformationScreen = ({navigation, route}) => {
    const {state, register, login, clearErrorMsg, apply} = useContext(AuthContext);
    const {title, job_slug} = route.params;
    const isIcon = false;
    const experience = useRef(null);
    const gitUrl = useRef(null);
    const linkedin = useRef(null);
    const comments = useRef(null);
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: applySchema,
        initialValues: {expSalary: '', experience: '', gitUrl: '', linkedin: '', comments: ''},
        onSubmit: (values) => {
            apply({
                job_slug,
                expected_salary: values.expSalary,
                additional_message: values.comments,
                additional_fields: [values.gitUrl, values.experience, values.linkedin]
            }, () => {
                navigation.navigate('Submission');
                clearErrorMsg();
                values.expSalary = '';
                values.experience = '';
                values.gitUrl = "";
                values.linkedin = "";
                values.comments = "";
            });

        }
    });
    const validationColor = !touched ? Colors.borderColor : errors?.expSalary ? '#FF5A5F' : Colors.borderColor;
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
                                <View style={{...styles.salaryContainer, borderColor: validationColor}}>
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
                                        onSubmitEditing={() => gitUrl.current?.focus()}
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
                            ref={experience}
                            keyboardType="numeric"
                            title={"Professional Experience (Years)*"}
                            autoComplete={"off"}
                            autoCorrect={false}
                            value={values.full_name}
                            onChangeText={handleChange('experience')}
                            onBlur={handleBlur('experience')}
                            error={errors.experience}
                            touched={touched.experience}
                            onSubmitEditing={() => gitUrl.current?.focus()}

                        />
                        <InputField
                            ref={gitUrl}
                            title={'GitHub URL*'}
                            autoComplete={"off"}
                            autoCorrect={false}
                            value={values.gitUrl}
                            onChangeText={handleChange('gitUrl')}
                            onBlur={handleBlur('gitUrl')}
                            error={errors.gitUrl}
                            touched={touched.gitUrl}
                            onSubmitEditing={() => linkedin.current?.focus()}
                        />
                        <InputField
                            ref={linkedin}
                            title={'Linkedin'}
                            autoComplete={"off"}
                            autoCorrect={false}
                            value={values.full_name}
                            onChangeText={handleChange('linkedin')}
                            onBlur={handleBlur('linkedin')}
                            error={errors.linkedin}
                            touched={touched.linkedin}
                            onSubmitEditing={() => comments.current?.focus()}
                        />
                        <View>
                            <Text marginB-8 text>Do you have anything to say to us?</Text>
                            <View style={styles.textInputStyle}>
                                <TextInput
                                    ref={comments}
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
                <View row marginV-15>
                    <TouchableOpacity flex-1 marginR-10 onPress={() => navigation.navigate('Apply')}>
                        <BlueOutlineBtn title={'Back'}/>
                    </TouchableOpacity>
                    <TouchableOpacity flex-1 onPress={handleSubmit}>
                        <FilledBtn title={'Submit'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    textInputStyle: {
        borderColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        height: 100,
        paddingHorizontal: 16,
        marginBottom: 15,
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
