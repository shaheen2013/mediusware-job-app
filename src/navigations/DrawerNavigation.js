import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import {Text, View} from 'react-native';
import LoginScreen from "../screens/LoginScreen";
import JobsScreen from "../screens/JobsScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import StackNavigation from "./StackNavigation";
import BottomNavigation from "./BottomNavigation";
import LoginStackNavigation from "./StackNavigators/LoginStackNavigation";
import JobsDetailsStackNavigation from "./StackNavigators/JobsDetailsStackNavigation";
import JobsStackNavigation from "./StackNavigators/JobsStackNavigation";


const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={JobsStackNavigation}/>
            <Drawer.Screen name="LoginStackNavigation" component={LoginStackNavigation}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;


