import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JobDetailsScreen from "../../screens/JobDetailsScreen";
import ApplyScreen from "../../screens/ApplyScreen";
import ApplicantInformationScreen from "../../screens/ApplicantInformationScreen";
import SubmissionScreen from "../../screens/SubmissionScreen";
import JobsScreen from "../../screens/JobsScreen";
import JobsDetailsStackNavigation from "./JobsDetailsStackNavigation";
import BottomNavigation from "../BottomNavigation";


const Stack = createNativeStackNavigator();
const JobsStackNavigation = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="BottomNavigation"
    >
        <Stack.Screen name="BottomNavigation" component={BottomNavigation}/>
        <Stack.Screen name="JobsDetailsStackNavigation" component={JobsDetailsStackNavigation}/>
    </Stack.Navigator>);
};

export default JobsStackNavigation;