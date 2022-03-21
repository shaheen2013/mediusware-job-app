import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text,TouchableOpacity,Colors} from 'react-native-ui-lib';
import LoginImg from "../../assets/svgIcon/LoginImg";
import CommonHeader from "../components/CommonHeader";
import InputFields from "../components/InputFields";
import SecondaryBtn from "../components/SecondaryBtn";
import PrimaryBtn from "../components/PrimaryBtn";

const ResetPasswordScreen = ({navigation, route}) => {
    const isIcon = false;
    return (
        <SafeAreaView>
            <CommonHeader name={route.name} navigation={navigation}/>
            <View paddingH-16>
                <LoginImg/>
                <Text headerText headerTextColor marginT-20>Reset Your Password</Text>
                <Text loginText loginTextColor marginB-20 marginT-8>We've send you an email with OTP code,
                    please fill the form bellow and hit enter to reset your password</Text>
                <InputFields  title={'Email Address'} placeholderText={'email@email.com'}/>
                <InputFields  title={'OTP'} placeholderText={'OTP Code'}/>
                <InputFields isIcon={true} title={'Password'} placeholderText={'New Password'}/>
                <InputFields isIcon={true} title={'Re-Type Password'} placeholderText={'Re-Type New Password'}/>

                <View row marginT-40>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')} flex-1 marginR-10>
                        <SecondaryBtn title={'Login'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> console.log('reset password')} flex-3>
                        <PrimaryBtn title={'Forgot Password'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default ResetPasswordScreen;
