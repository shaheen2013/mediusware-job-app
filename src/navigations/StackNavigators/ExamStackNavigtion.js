import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ExamProgressScreen from "../../screens/ExamProgressScreen";
import McqQuizScreen from "../../screens/McqQuizScreen";
import MCQScreen from "../../screens/MCQScreen";
const Stack = createNativeStackNavigator();
const ExamStackNavigation = () => {
    return (<Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="ExamProgress"
    >
        <Stack.Screen name="ExamProgress" component={ExamProgressScreen}/>
        <Stack.Screen name="MCQ" component={MCQScreen}/>
        <Stack.Screen name="McqQuiz" component={McqQuizScreen}/>
        {/* <Stack.Screen name="WrittenExam" component={WrittenExamScreen}/>
        <Stack.Screen name="WrittenExamQuestion" component={WrittenExamQuestionScreen}/>
        <Stack.Screen name="Result" component={ResultScreen}/>
        <Stack.Screen name="Examination" component={ExaminationScreen}/> */}
    </Stack.Navigator>);
};

export default ExamStackNavigation;