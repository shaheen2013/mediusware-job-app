import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text,TouchableOpacity,Colors} from 'react-native-ui-lib';
import LoginImg from "../../assets/svgIcon/LoginImg";
import CommonHeader from "../components/CommonHeader";
import InputFields from "../components/InputFields";
import PrimaryBtn from "../components/PrimaryBtn";

const LoginScreen = ({navigation, route}) => {
    const isIcon = false;
    return (
        <SafeAreaView>
            <CommonHeader name={route.name} navigation={navigation}/>
            <View paddingH-16>
                <LoginImg/>
                <Text headerText headerTextColor marginT-20>Hello,{'\n'}
                    Good to see you again!</Text>
                <Text loginText loginTextColor marginB-20 marginT-8>Log in to get going with our recruitment process!</Text>
                <InputFields  title={'Email Address'} placeholderText={'email@email.com'}/>
                <InputFields isIcon={true} title={'Password'} placeholderText={'Input Password'}/>
                <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')}>
                    <Text primaryTextColor style={{alignSelf:'flex-end'}}>Forgot Password?</Text>
                </TouchableOpacity>
               <TouchableOpacity marginT-40>
                   <PrimaryBtn title={'Login'}/>
               </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default LoginScreen;
