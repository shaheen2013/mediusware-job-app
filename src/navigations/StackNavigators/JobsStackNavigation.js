import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { Context as AuthContext } from "../../contexts/AuthContext";
import ExamStackNavigation from "./ExamStackNavigtion";
import JobsDetailsStackNavigation from "./JobsDetailsStackNavigation";


const Stack = createNativeStackNavigator();
const JobsStackNavigation = () => {
    const {state:{token},tryLocalLogin} = useContext(AuthContext);
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName={"JobsDetailsStackNavigation"}
    >
            <Stack.Screen name="JobsDetailsStackNavigation" component={JobsDetailsStackNavigation}/>
            <Stack.Screen name="ExamStackNavigation" component={ExamStackNavigation}/>

    </Stack.Navigator>
    );
};

export default JobsStackNavigation;