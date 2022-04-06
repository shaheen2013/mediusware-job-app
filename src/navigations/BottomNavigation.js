import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsScreen from "../screens/JobsScreen";
import ExamProgress from "../screens/ExamProgressScreen";
import StackNavigation from "./StackNavigation";
import DrawerNavigation from "./DrawerNavigation";


const Tab = createBottomTabNavigator();
const BottomNavigation = () => {

    return (
        <Tab.Navigator initialRouteName="Home"
                       screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={JobsScreen} />
            <Tab.Screen name="Dashboard" component={ExamProgress} />
        </Tab.Navigator>

    );
};

export default BottomNavigation;