import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from "./CustomDrawerContent";
import JobsStackNavigation from "./StackNavigators/JobsStackNavigation";
import LoginStackNavigation from "./StackNavigators/LoginStackNavigation";
const Drawer = createDrawerNavigator();


const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="JobStack" component={JobsStackNavigation}/>
            <Drawer.Screen name="LoginStackNavigation" component={LoginStackNavigation}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;


