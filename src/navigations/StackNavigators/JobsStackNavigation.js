import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JobsDetailsStackNavigation from "./JobsDetailsStackNavigation";
import BottomNavigation from "../BottomNavigation";
import ExamStackNavigation from "./ExamStackNavigtion";
import {Context as AuthContext} from "../../contexts/AuthContext";
import JobsScreen from "../../screens/JobsScreen";


const Stack = createNativeStackNavigator();
const JobsStackNavigation = () => {
    const {state:{token},tryLocalLogin} = useContext(AuthContext);
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName={"JobsDetailsStackNavigation"}
    >
            <Stack.Screen name="JobsDetailsStackNavigation" component={JobsDetailsStackNavigation}/>
            <Stack.Screen name="ExamStackNavigation" component={ExamStackNavigation}/>

    </Stack.Navigator>
    );
};

export default JobsStackNavigation;