import React, {useContext, useEffect, useState,useRef,useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar,ScrollView} from "react-native";
import Quiz from "../components/ExamProgress/Quiz";
import OutlineBtn from "../components/buttons/OutlineBtn";
import {Context as AuthContext} from "../contexts/AuthContext";
import {Context as AssessmentContext} from "../contexts/AssessmentContext";
import moment from 'moment';

const McqQuizScreen = ({navigation, route}) => {
    const {id} = route.params;
    const {state:{token}} = useContext(AuthContext);
    const [selectedAnswers,setSelectedAnswers] = useState([]);
    const [selection,setSelection] = useState(null);
    const {state:{assessment,quiz},getAssessment,getQuizQuestion,startExam,clearErrorMsg,savedAnswer} = useContext(AssessmentContext);
    const [time,setTime] = useState(null);
    useEffect(()=>{
        getAssessment(token);
    },[token])



    const nextStep = () =>{
        savedAnswer({uuid:id,question_id:quiz?.quiz?.id,answers:selectedAnswers},token,()=>{
            setSelectedAnswers([]);
            getQuizQuestion(token,id,()=>{
                clearErrorMsg();
            },()=>{
                navigation.navigate('Result',{assessment:assessment});
            })
        })
    }

    const skipStep = () =>{
        savedAnswer({uuid:id,question_id:quiz?.quiz?.id,answers:[]},token,()=>{
            setSelectedAnswers([]);
            getQuizQuestion(token,id,()=>{
                clearErrorMsg();
            },()=>{
                navigation.navigate('Result',{assessment:assessment});
            })
        })
    }
    useEffect(()=>{
        calculateDuration();
    },[])



    const calculateDuration = eventTime => moment.duration(Math.max(Math.floor(new Date(eventTime).getTime() / 1000 - (3600*6)) - (Math.floor(Date.now() / 1000)), 0), 'seconds');
   // const calculateDuration = eventTime => moment.duration(Math.max(Math.floor(new Date(eventTime).getTime()) / 1000) - (Math.floor(Date.now() / 1000)), 0), 'seconds');
    //const calculateDuration = eventTime => moment.duration((moment(eventTime).unix()) - moment().unix());


    function Countdown({ eventTime, interval }) {
         console.log('event-time.....',eventTime);
        const [duration, setDuration] = useState(calculateDuration(eventTime));
        const timerRef = useRef(0);
        const timerCallback = useCallback(() => {
            setDuration(calculateDuration(eventTime));
        }, [eventTime])

        useEffect(() => {
            timerRef.current = setInterval(timerCallback, interval);

            return () => {
                clearInterval(timerRef.current);
            }
        }, [eventTime]);

       /* useEffect(()=>{
            if(duration.hours() === 0 && duration.minutes() === 0 && duration.seconds() === 0){
                navigation.navigate('Result',{assessment:assessment});
            }
        },[duration.hours(),duration.minutes(),duration.seconds()])*/

        return (
                <Text subtitle3 warningColor marginB-10>Exam Time: {duration.hours()}:{duration.minutes()}: {duration.seconds()}</Text>

        )
    }



    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"MCQ"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 style={{flex:1}}>
                <Text subtitle1 deepGray marginB-10>{assessment?.assessment?.candidate_job?.job?.title}- MCQ</Text>
                {/*<Text subtitle3 warningColor marginB-10>{time}</Text>*/}
                <Countdown eventTime={assessment?.assessment?.exam_end_at} interval={1000}/>
                <Text subtitle3 warningColor marginB-10></Text>
                <ScrollView flex-2 showsVerticalScrollIndicator={false}>
                    <Quiz
                        selectedAnswers={selectedAnswers}
                        setSelectedAnswers={setSelectedAnswers}
                        selection={selection}
                        setSelection={setSelection}
                        type={quiz?.quiz?.type}
                        title={quiz?.quiz?.title}
                        answers={quiz?.quiz?.answers && quiz?.quiz?.answers}
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