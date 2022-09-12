import React, { useContext, useEffect } from 'react';
import { StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import FilledBtn from "../components/buttons/FilledBtn";
import CommonHeader from "../components/CommonHeader";
import ExamCard from "../components/ExamProgress/ExamCard";
import { Context as AssessmentContext } from "../contexts/AssessmentContext";
import { Context as AuthContext } from "../contexts/AuthContext";

const WrittenExamScreen = ({navigation, route}) => {
    const {state:{token}} = useContext(AuthContext);
    const {id} = route.params;
    const {state:{assessment,errorMsg}, clearErrorMsg,getAssessment,getQuizQuestion,startExam,startReExam} = useContext(AssessmentContext);
    useEffect(()=>{
        getAssessment(token,id);
    },[token])


    const startingExam = () =>{
        if(assessment?.assessment?.exam_started_at === null){
            startExam(token,id, ()=>{
                startingExamination();
            })
        }else{

            startingExamination();
        }
    }

    const startingExamination = () =>{
        startReExam(token,id, ()=>{
            getQuizQuestion(token,id,()=>{
                clearErrorMsg();
                navigation.navigate('WrittenExamQuestion',{id: id});
            },()=>{
                
            });
        })
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"Written"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 style={{flex:1}}>
                <Text subtitle1 deepGray marginB-10>{assessment?.assessment?.candidate_job?.job?.title}- Written</Text>
                <ExamCard
                    score={assessment?.assessment?.assessment?.score}
                    duration={assessment?.assessment?.assessment?.duration}
                    passScore={assessment?.assessment?.assessment?.pass_score}
                />

                <TouchableOpacity marginV-10 onPress={startingExam}>
                    <FilledBtn title={'Start Exam'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default WrittenExamScreen;