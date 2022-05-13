import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JobsDetailsStackNavigation from "./JobsDetailsStackNavigation";
import BottomNavigation from "../BottomNavigation";
import ExamStackNavigation from "./ExamStackNavigtion";


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
        <Stack.Screen name="ExamStackNavigation" component={ExamStackNavigation}/>
    </Stack.Navigator>);
};

export default JobsStackNavigation;