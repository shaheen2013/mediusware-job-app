import React from 'react';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MCQScreen from "../../screens/MCQScreen";
import McqQuizScreen from "../../screens/McqQuizScreen";
import ResultScreen from "../../screens/ResultScreen";
import WrittenExamScreen from "../../screens/WrittenExamScreen";

const Stack = createNativeStackNavigator();
const ExamStackNavigation = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="MCQ"
    >
        <Stack.Screen name="MCQ" component={MCQScreen}/>
        <Stack.Screen name="McqQuiz" component={McqQuizScreen}/>
        <Stack.Screen name="WrittenExam" component={WrittenExamScreen}/>
        <Stack.Screen name="Result" component={ResultScreen}/>
    </Stack.Navigator>);
};

export default ExamStackNavigation;