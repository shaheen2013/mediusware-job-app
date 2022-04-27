import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from "../../screens/ProfileScreen";
import ChangePasswordScreen from "../../screens/ChangePasswrodScreen";
import {Context as AuthContext} from "../../contexts/AuthContext";



const Stack = createNativeStackNavigator();
const DashboardStackNavigation = () => {
    //const {state,tryLocalLogin}= useContext(AuthContext);
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Profile"
    >
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
    </Stack.Navigator>);
};

export default DashboardStackNavigation;