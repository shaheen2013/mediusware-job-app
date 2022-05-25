import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar,ScrollView} from "react-native";
import Quiz from "../components/ExamProgress/Quiz";
import OutlineBtn from "../components/buttons/OutlineBtn";
import {Context as AuthContext} from "../contexts/AuthContext";
import {Context as AssessmentContext} from "../contexts/AssessmentContext";

const McqQuizScreen = ({navigation, route}) => {
    const {state:{token}} = useContext(AuthContext);
    const {state:{assessment,quiz},getAssessment,getQuizQuestion,startExam} = useContext(AssessmentContext);
    useEffect(()=>{
        getAssessment(token);
    },[token])

    console.log(quiz?.quiz?.title,'quiz...');

    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"MCQ"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 style={{flex:1}}>
                <View flex-9>
                    <Text subtitle1 deepGray marginB-10>{assessment?.assessment?.candidate_job?.job?.title}- MCQ</Text>
                    <Quiz
                        title={quiz?.quiz?.title}
                        answer1={quiz?.quiz?.answers && quiz?.quiz?.answers[0]?.title}
                        answer2={quiz?.quiz?.answers && quiz?.quiz?.answers[1]?.title}
                        answer3={quiz?.quiz?.answers && quiz?.quiz?.answers[2]?.title}
                        answer4={quiz?.quiz?.answers && quiz?.quiz?.answers[3]?.title}
                    />
                </View>
                <View row flex-1>
                    <TouchableOpacity flex-1 marginR-10 onPress={()=>navigation.navigate('Result')}>
                        <FilledBtn title={'Next'}/>
                    </TouchableOpacity>
                    <TouchableOpacity flex-1 onPress={()=>navigation.navigate('ExamProgress')}>
                        <OutlineBtn title={'Skip'}/>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    );
};


export default McqQuizScreen;