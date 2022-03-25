import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';

import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import OutlineBtn from "../components/buttons/OutlineBtn";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar, StyleSheet, TextInput} from "react-native";
import {Feather} from "@expo/vector-icons";
import BlueOutlineBtn from "../components/buttons/BlueOutlineBtn";

const ApplicantInformationScreen = ({navigation, route}) => {
    const isIcon = false;
    return (
        <SafeAreaView style={{flex: 1}}>
            <CommonHeader name="Applicant Information" navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 flex-1>
                <View flex-8>
                    <Text subtitle4 blue marginB-10>Job application for “UX UI Designer</Text>
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
                                numberOfLines={5}
                                style={{
                                    textAlignVertical: 'top',
                                    fontFamily: 'Montserrat_400Regular'
                                }}
                            />
                        </View>
                    </View>
                </View>

                <View flex-1>
                    <View row>
                        <TouchableOpacity marginT-14 flex-1 marginR-10 onPress={()=>navigation.navigate('Apply')}>
                            <BlueOutlineBtn title={'Back'}/>
                        </TouchableOpacity>
                        <TouchableOpacity marginT-14 flex-1>
                            <FilledBtn title={'Submit'}/>
                        </TouchableOpacity>
                    </View>
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
