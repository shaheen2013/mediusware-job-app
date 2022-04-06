import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import {Text, View} from 'react-native';
import LoginScreen from "../screens/LoginScreen";
import JobsScreen from "../screens/JobsScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import StackNavigation from "./StackNavigation";
import BottomNavigation from "./BottomNavigation";


const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="BottomNavigation" component={BottomNavigation}/>
            <Drawer.Screen name="StackNavigation" component={StackNavigation}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;
