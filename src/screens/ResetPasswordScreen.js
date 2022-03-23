import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import LoginImg from "../../assets/svgIcon/LoginImg";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import SecondaryBtn from "../components/buttons/SecondaryBtn";
import PrimaryBtn from "../components/buttons/PrimaryBtn";

const ResetPasswordScreen = ({navigation, route}) => {
    const isIcon = false;
    return (<SafeAreaView>
        <CommonHeader name={'Reset Password'} navigation={navigation}/>
        <View paddingH-16 marginT-20>
            <LoginImg/>
            <Text headerText headerTextColor marginT-20>Reset Your Password</Text>
            <Text primaryText regularTextColor marginB-20 marginT-8>We've send you an email with OTP code,
                please fill the form bellow and hit enter to reset your password</Text>
            <InputField title={'Email Address'} placeholderText={'email@email.com'}/>
            <InputField title={'OTP'} placeholderText={'OTP Code'}/>
            <InputField isIcon={true} title={'Password'} placeholderText={'New Password'}/>
            <InputField isIcon={true} title={'Re-Type Password'} placeholderText={'Re-Type New Password'}/>

            <View row marginT-40>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} flex-1 marginR-10>
                    <SecondaryBtn title={'Login'}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('reset password')} flex-3>
                    <PrimaryBtn title={'Forgot Password'}/>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>);
};


export default ResetPasswordScreen;
