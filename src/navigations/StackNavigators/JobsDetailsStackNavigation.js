import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JobDetailsScreen from "../../screens/JobDetailsScreen";
import ApplyScreen from "../../screens/ApplyScreen";
import ApplicantInformationScreen from "../../screens/ApplicantInformationScreen";
import SubmissionScreen from "../../screens/SubmissionScreen";
import JobsScreen from "../../screens/JobsScreen";


const Stack = createNativeStackNavigator();
const JobsDetailsStackNavigation = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="JobDetails"
    >
        <Stack.Screen name="JobDetails" component={JobDetailsScreen}/>
        <Stack.Screen name="Apply" component={ApplyScreen}/>
        <Stack.Screen name="ApplicantInformation" component={ApplicantInformationScreen}/>
        <Stack.Screen name="Submission" component={SubmissionScreen}/>
    </Stack.Navigator>);
};

export default JobsDetailsStackNavigation;