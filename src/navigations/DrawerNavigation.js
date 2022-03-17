import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import {Text, View} from 'react-native';
import LoginScreen from "../screens/LoginScreen";
import JobsScreen from "../screens/JobsScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import StackNavigation from "./StackNavigation";


const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Jobs"
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Jobs" component={JobsScreen}/>
            <Drawer.Screen name="Login" component={StackNavigation}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
