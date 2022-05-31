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
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Toast from "react-native-toast-message";
const toastConfig = {
    tomatoToast: ({ text1, props }) => (
        <View
            style={{ height: 80,
                backgroundColor: Colors.borderColor,
                borderRadius:10,
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                opacity:1,
                borderLeftWidth:5,
                borderLeftColor:Colors.warningColor,
                marginHorizontal:16,
                paddingHorizontal:16,

            }}>
            <Ionicons name="warning" size={40} color={Colors.warningColor} />
            <Text subtitle1 warningColor>{text1}</Text>
        </View>
    )
};


const MCQScreen = ({navigation, route}) => {
    const {state:{token}} = useContext(AuthContext);
    const {id} = route.params;
    //console.log("Quiz is in mcq screen, ",id);
    //console.log(token);
    const {state:{assessment,errorMsg}, clearErrorMsg,getAssessment,getQuizQuestion,startExam,startReExam} = useContext(AssessmentContext);
    useEffect(()=>{
        getAssessment(token,id);
    },[token])
    const startingExam = () =>{
           if(assessment?.assessment?.exam_started_at === null){
               startExam(token,id, ()=>{
                   getQuizQuestion(token,id),()=>{
                       clearErrorMsg();
                       navigation.navigate('McqQuiz', {id: id});
                   };

               })
           }else{
               startReExam(token,id, ()=>{
                   getQuizQuestion(token,id,()=>{
                       clearErrorMsg();
                       navigation.navigate('McqQuiz',{id: id});
                   });
               })

           }


    }

    useEffect(() => {
        showToast();
        clearErrorMsg();
    }, [errorMsg?.error])

    const showToast = () => {
        errorMsg?.error && Toast.show({
            type: 'tomatoToast',
            text1: ` ${errorMsg?.error}`
        })
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"MCQ"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            {
                assessment?.assessment === undefined ?
                    (<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <ActivityIndicator size={50} color="#0000ff" style={{height:80}}/>
                    </View>):
                <View paddingH-16 marginT-20 style={{flex: 1}}>
                <Text subtitle1 deepGray
                      marginB-10>{assessment?.assessment?.candidate_job?.job?.title} -
                    MCQ</Text>
                <ExamCard
                    score={assessment?.assessment?.assessment?.score}
                    duration={assessment?.assessment?.assessment?.duration}
                    passScore={assessment?.assessment?.assessment?.pass_score}
                />
                {/*<Text subtitle3 marginT-20 warningColor>STOP!!!</Text>
                <Text text marginT-10 warningColor>You can start the exam at any time but we prefer ASAP. And once you start you have to finish within the given allocated maximum hours.</Text>
                <Text subtitle1 deepGray marginT-10>Read before Starting Exam</Text>*/}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HTMLView
                        value={assessment?.assessment?.assessment?.description}
                        // style={styles}
                    />

                </ScrollView>
                <TouchableOpacity marginV-10 onPress={startingExam}>
                    <FilledBtn title={'Start Exam'}/>
                </TouchableOpacity>
                <Toast
                    config={toastConfig}
                    visibilityTime={3000}
                    position='top'
                />
            </View>}
        </SafeAreaView>
    );
};

export default MCQScreen;
