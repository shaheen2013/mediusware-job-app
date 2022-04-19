import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import LoginImg from "../../assets/svgIcon/LoginImg";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar} from "react-native";

const LoginScreen = ({navigation, route}) => {
    const isIcon = false;
    return (<SafeAreaView>
        <CommonHeader name={route.name} navigation={navigation}/>
        <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
        <View paddingH-16 marginT-20>
            <LoginImg/>
            <Text h5 deepGray marginT-20>Hello,{'\n'}
                Good to see you again!</Text>
            <Text text gray marginB-20 marginT-8>Log in to get going with our recruitment
                process!</Text>
            <InputField title={'Email Address'} placeholderText={'email@email.com'}/>
            <InputField isIcon={true} title={'Password'} placeholderText={'Input Password'}/>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text blue text style={{alignSelf: 'flex-end'}}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity marginT-40>
                <FilledBtn title={'Login'}/>
            </TouchableOpacity>
            <View>
                <Text text gray marginV-20>If don't apply any mediusware job,then apply one <Text
                    onPress={() => navigation.navigate('BottomNavigation',{screen:'Home'})} blue>Job</Text></Text>
            </View>
        </View>
    </SafeAreaView>);
};


export default LoginScreen;
