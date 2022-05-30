import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JobDetailsScreen from "../../screens/JobDetailsScreen";
import ApplyScreen from "../../screens/ApplyScreen";
import ApplicantInformationScreen from "../../screens/ApplicantInformationScreen";
import SubmissionScreen from "../../screens/SubmissionScreen";
import JobsScreen from "../../screens/JobsScreen";
import BottomNavigation from "../BottomNavigation";
import {Context as AuthContext} from "../../contexts/AuthContext";
import JobsStackNavigation from "./JobsStackNavigation";



const Stack = createNativeStackNavigator();
const JobsDetailsStackNavigation = () => {
    const {state:{token},tryLocalLogin} = useContext(AuthContext);

    return (<Stack.Navigator
        screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: "horizontal",
        }}
        initialRouteName={token ? "BottomNavigation" :"Home"}
    >
        {token ?  <Stack.Screen name="BottomNavigation" component={BottomNavigation}/> : <Stack.Screen name="Home" component={JobsScreen}/>}
        <Stack.Screen name="JobDetails" component={JobDetailsScreen}/>
        <Stack.Screen name="Apply" component={ApplyScreen}/>
        <Stack.Screen name="ApplicantInformation" component={ApplicantInformationScreen}/>
        <Stack.Screen name="Submission" component={SubmissionScreen}/>
    </Stack.Navigator>);
};

export default JobsDetailsStackNavigation;