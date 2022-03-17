import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
//import {Text, View} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {StyleSheet, TouchableOpacity} from "react-native";
import LoginImg from "../../assets/svgIcon/LoginImg";
import HeaderTitle from "../components/HeaderTitle";
import MediuswareIcon from "../../assets/svgIcon/MediuswareIcon";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/InputField";
import PasswordInputField from "../components/PasswordInputField";

const LoginScreen = ({navigation, route}) => {
    return (
        <SafeAreaView>
            <CommonHeader name={route.name} navigation={navigation}/>
            <View style={styles.container}>
                <LoginImg/>
                <Text style={{fontSize: 24, textColor: '#2B2B2B', fontFamily: 'Montserrat_500Medium'}}>Hello,{'\n'}
                    Good to see you again!</Text>
                <Text  style={{fontSize: 14, textColor: '#4D4D4D', fontFamily: 'Montserrat_400Regular',marginVertical:8}}>Log in to get going with our recruitment process!</Text>
                <InputField title={'Email Address'} placeholderText={'email@email.com'}/>
                <PasswordInputField title={'Password'} placeholderText={'Input Password'}/>
                <TouchableOpacity onPress={console.log('Forget Password')}>
                    <Text style={styles.forgotPasswordStyle}>Forget Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttonStyle}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    forgotPasswordStyle: {
        fontSize: 14,
        alignSelf: "flex-end",
        color: '#004D8C',
        marginBottom: 50,
    },
    buttonStyle: {
        width: '100%',
        textAlign: 'center',
        height: 50,
        fontSize:14,
        backgroundColor: '#0060AF',
        paddingVertical: 12,
        borderRadius: 10,
        fontWeight: 'bold',
        color: 'white'
    },
})


export default LoginScreen;
