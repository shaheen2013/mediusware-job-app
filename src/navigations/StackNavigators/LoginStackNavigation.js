import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "../../screens/LoginScreen";
import ForgotPasswordScreen from "../../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../../screens/ResetPasswordScreen";


const Stack = createNativeStackNavigator();
const LoginStackNavigation = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Login"
    >
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
    </Stack.Navigator>);
};

export default LoginStackNavigation;