import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import LoginImg from "../../assets/svgIcon/LoginImg";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import PrimaryBtn from "../components/buttons/PrimaryBtn";

const LoginScreen = ({navigation, route}) => {
    const isIcon = false;
    return (
        <SafeAreaView>
            <CommonHeader name={route.name} navigation={navigation}/>
            <View paddingH-16>
                <LoginImg/>
                <Text headerText headerTextColor marginT-20>Hello,{'\n'}
                    Good to see you again!</Text>
                <Text primaryText regularTextColor marginB-20 marginT-8>Log in to get going with our recruitment
                    process!</Text>
                <InputField title={'Email Address'} placeholderText={'email@email.com'}/>
                <InputField isIcon={true} title={'Password'} placeholderText={'Input Password'}/>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text primaryColor primaryText style={{alignSelf: 'flex-end'}}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity marginT-40>
                    <PrimaryBtn title={'Login'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default LoginScreen;
