import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { Context as AuthContext } from "../../contexts/AuthContext";
import ApplicantInformationScreen from "../../screens/ApplicantInformationScreen";
import ApplyScreen from "../../screens/ApplyScreen";
import JobDetailsScreen from "../../screens/JobDetailsScreen";
import JobsScreen from "../../screens/JobsScreen";
import SubmissionScreen from "../../screens/SubmissionScreen";
import BottomNavigation from "../BottomNavigation";



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