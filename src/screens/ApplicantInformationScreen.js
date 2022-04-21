import React, {useContext, useState} from 'react';
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

const ApplicantInformationScreen = ({navigation, route}) => {
    const {state,register,login} = useContext(AuthContext);
    const {title} = route.params;
    const isIcon = false;
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
                                <View style={styles.currencyContainer}>
                                    <Text>BDT</Text>
                                </View>
                                <View style={styles.salaryContainer}>
                                    <TextInput
                                        style={{
                                            fontFamily: 'Montserrat_400Regular'
                                        }}
                                        placeholder={"Enter Your Expected Salary"}
                                    />
                                </View>
                            </View>
                        </View>
                        <InputField title={'GitHub URL*'}/>
                        <InputField title={'Linkedin'}/>
                        <View>
                            <Text marginB-8 text>Do you have anything to say to us?</Text>
                            <View style={styles.textInputStyle}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={10}
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
                    <TouchableOpacity flex-1 onPress={() => navigation.navigate('Submission')}>
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
        borderColor: '#E9E9E9',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    salaryContainer: {
        borderColor: '#E9E9E9',
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
