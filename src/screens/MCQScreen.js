import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar, ScrollView, StyleSheet, ActivityIndicator} from "react-native";
import Point from "../components/ExamProgress/Point";
import ExamCard from "../components/ExamProgress/ExamCard";
import useApply from "../hooks/useApply";
import HTMLView from 'react-native-htmlview';
import {Context as AssessmentContext} from "../contexts/AssessmentContext";
import {Context as AuthContext} from "../contexts/AuthContext";

const MCQScreen = ({navigation, route}) => {
    const {state:{token}} = useContext(AuthContext);
    const {state:{assessment},getAssessment,getQuizQuestion,startExam} = useContext(AssessmentContext);
    useEffect(()=>{
        getAssessment(token);
    },[token])
    const startingExam = () =>{
        if(assessment?.assessment){
            console.log(assessment?.assessment[0]?.unique_id);
            startExam(token,assessment?.assessment[0]?.unique_id);
            getQuizQuestion(assessment?.assessment && token,assessment?.assessment[0]?.unique_id);
            navigation.navigate('McqQuiz')
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"MCQ"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 style={{flex:1}}>
               <Text subtitle1 deepGray marginB-10>{assessment?.assessment && assessment?.assessment[0]?.candidate_job?.job?.title} - MCQ</Text>
                <ExamCard
                    score={assessment?.assessment && assessment?.assessment[0]?.assessment?.score}
                    duration={assessment?.assessment && assessment?.assessment[0]?.assessment?.duration}
                    passScore={assessment?.assessment && assessment?.assessment[0]?.assessment?.pass_score}
                />
                {/*<Text subtitle3 marginT-20 warningColor>STOP!!!</Text>
                <Text text marginT-10 warningColor>You can start the exam at any time but we prefer ASAP. And once you start you have to finish within the given allocated maximum hours.</Text>
                <Text subtitle1 deepGray marginT-10>Read before Starting Exam</Text>*/}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        assessment?.assessment === undefined ?
                            (<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <ActivityIndicator size={50} color="#0000ff" style={{height:80}}/>
                            </View>)
                       :<HTMLView
                            value={ assessment?.assessment && assessment?.assessment[0]?.assessment?.description}
                            // style={styles}
                        />
                    }
                </ScrollView>
                <TouchableOpacity marginV-10 onPress={startingExam}>
                    <FilledBtn title={'Start Exam'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default MCQScreen;

// const styles = StyleSheet.create({
//     h1: {
//         fontSize: 14,
//         fontFamily: 'Montserrat_500Medium', // make links coloured pink
//         color:Colors.warningColor,
//         marginTop:20
//     },
// });