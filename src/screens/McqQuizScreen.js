import React, {useContext, useEffect, useState} from 'react';
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
    const {id} = route.params;
    //console.log("Quiz id is: ",id);
    const {state:{token}} = useContext(AuthContext);
    const [selectedAnswers,setSelectedAnswers] = useState([]);
    const [selection,setSelection] = useState(null);
    const {state:{assessment,quiz},getAssessment,getQuizQuestion,startExam,clearErrorMsg,savedAnswer} = useContext(AssessmentContext);
    useEffect(()=>{
        getAssessment(token);
    },[token])

    //console.log("Quiz id.............",quiz?.quiz?.id);

    const nextStep = () =>{
        savedAnswer({uuid:id,question_id:quiz?.quiz?.id,answers:[selection]},token,()=>{
            getQuizQuestion(token,id),()=>{
                clearErrorMsg();
            };
        })
    }

    const skipStep = () =>{
        savedAnswer({uuid:id,question_id:quiz?.quiz?.id,answers:[]},token,()=>{
            getQuizQuestion(token,id),()=>{
                clearErrorMsg();
            };
        })
    }


    //console.log(quiz?.quiz?.title,'quiz...');

    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"MCQ"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 style={{flex:1}}>
                <Text subtitle1 deepGray marginB-10>{assessment?.assessment?.candidate_job?.job?.title}- MCQ</Text>
                <ScrollView flex-2 showsVerticalScrollIndicator={false}>
                    <Quiz
                        selection={selection}
                        setSelection={setSelection}
                        title={quiz?.quiz?.title}
                        answer1={quiz?.quiz?.answers && quiz?.quiz?.answers[0]}
                        answer2={quiz?.quiz?.answers && quiz?.quiz?.answers[1]}
                        answer3={quiz?.quiz?.answers && quiz?.quiz?.answers[2]}
                        answer4={quiz?.quiz?.answers && quiz?.quiz?.answers[3]}
                    />
                </ScrollView>
                <View row marginV-16>
                    <TouchableOpacity flex-1 marginR-10 onPress={nextStep}>
                        <FilledBtn title={'Next'}/>
                    </TouchableOpacity>
                    <TouchableOpacity flex-1 onPress={skipStep}>
                        <OutlineBtn title={'Skip'}/>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    );
};


export default McqQuizScreen;