import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import CustomDrawerContent from "./CustomDrawerContent";
import LoginStackNavigation from "./StackNavigators/LoginStackNavigation";
import JobsStackNavigation from "./StackNavigators/JobsStackNavigation";


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


