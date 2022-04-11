import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from "../../screens/ProfileScreen";



const Stack = createNativeStackNavigator();
const DashboardStackNavigation = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Profile"
    >
        <Stack.Screen name="Profile" component={ProfileScreen}/>

    </Stack.Navigator>);
};

export default DashboardStackNavigation;