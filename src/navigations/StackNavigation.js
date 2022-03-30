import React from 'react';

import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import JobDetailsScreen from "../screens/JobDetailsScreen";
import ApplyScreen from "../screens/ApplyScreen";
import ApplicantInformationScreen from "../screens/ApplicantInformationScreen";
import SubmissionScreen from "../screens/SubmissionScreen";
import ExamProgressScreen from "../screens/ExamProgressScreen";

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
    return (<Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
            <Stack.Screen name="JobDetails" component={JobDetailsScreen}/>
            <Stack.Screen name="Apply" component={ApplyScreen}/>
            <Stack.Screen name="ApplicantInformation" component={ApplicantInformationScreen}/>
            <Stack.Screen name="Submission" component={SubmissionScreen}/>
            <Stack.Screen name="ExamProgress" component={ExamProgressScreen}/>
        </Stack.Navigator>);
};

export default StackNavigation;
