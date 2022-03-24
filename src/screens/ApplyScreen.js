import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';

import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import OutlineBtn from "../components/buttons/OutlineBtn";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar,StyleSheet} from "react-native";
import {Feather} from "@expo/vector-icons";

const ApplyScreen = ({navigation, route}) => {
    const isIcon = false;
    return (
        <SafeAreaView>
            <CommonHeader name={route.name} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20>
                <Text subtitle4 blue marginB-10>Job application for “UX UI Designer</Text>
                <View>
                    <Text text gray marginB-20>If already have Mediusware job account then please <Text onPress={()=>navigation.navigate('Login')} blue>Login</Text></Text>
                </View>


                <InputField title={'Full Name*'} placeholderText={'Enter Your Name'}/>
                <InputField title={'Email Address*'} placeholderText={'Enter Your Email'}/>
                <InputField title={'Phone Number'} placeholderText={'+880'}/>
                <InputField isIcon={true} title={'Password'} placeholderText={'Enter Your Password'}/>
                <InputField isIcon={true} title={'Re-Type Password'} placeholderText={'Enter Your Re-Type Password'}/>
                <View>
                    <Text marginB-8 text>CV/Resume*</Text>
                    <View style={styles.uploadContainer}>
                        <View style={styles.uploadStyle}>
                            <TouchableOpacity paddingH-10 paddingV-3><Text blue subtitle3>Choose File</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity marginT-14 onPress={()=> navigation.navigate('ApplicantInformation')}>
                    <FilledBtn title={'Continue'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    uploadContainer:{
        borderColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 15,
    },
    uploadStyle:{
        borderColor: '#E9E9E9',
        height: 32,
        borderWidth:1,
        marginVertical:8,
        borderRadius:10,
        width:'33%'
    }
})


export default ApplyScreen;
