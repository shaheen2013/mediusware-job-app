import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExamProgressScreen from "../../screens/ExamProgressScreen";
import DashBoardScreen from "../../screens/DashBoardScreen";


const Stack = createNativeStackNavigator();
const DashboardStackNavigation = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Dashboard"
    >
        <Stack.Screen name="Dashboard" component={DashBoardScreen}/>
        <Stack.Screen name="ExamProgress" component={ExamProgressScreen}/>
    </Stack.Navigator>);
};

export default DashboardStackNavigation;