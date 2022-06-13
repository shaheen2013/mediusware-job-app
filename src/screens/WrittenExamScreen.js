import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar,ScrollView} from "react-native";
import Point from "../components/ExamProgress/Point";
import ExamCard from "../components/ExamProgress/ExamCard";
import {Context as AuthContext} from "../contexts/AuthContext";
import {Context as AssessmentContext} from "../contexts/AssessmentContext";
import HTMLView from 'react-native-htmlview';

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
                //navigation.navigate('Result',{assessment:assessment});
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

                <ScrollView showsVerticalScrollIndicator={false}>
                    <HTMLView
                        value={assessment?.assessment?.assessment?.description}
                        // style={styles}
                    />

                </ScrollView>
                {/*<Text subtitle3 marginT-20 warningColor>STOP!!!</Text>
                <Text text marginT-10 warningColor>
                    You can start the exam at any time but we prefer ASAP. And once you start you have to finish within the given allocated maximum hours.
                </Text>
                <Text subtitle1 deepGray marginT-10>Read before Starting Exam</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text text gray marginV-10>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>4 .Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>5. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>6. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>7. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                </ScrollView>*/}
                <TouchableOpacity marginV-10 onPress={startingExam}>
                    <FilledBtn title={'Start Exam'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default WrittenExamScreen;