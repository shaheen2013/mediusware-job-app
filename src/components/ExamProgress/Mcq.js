import React, {useContext, useEffect} from 'react';
import {Colors, Text, View,TouchableOpacity} from 'react-native-ui-lib';
import Point from "./Point";
import FilledBtn from "../buttons/FilledBtn";
import AlertOutlineBtn from "../buttons/AlertOutlineBtn";
import {Context as AssessmentContext} from "../../contexts/AssessmentContext";
const Mcq = ({navigation,title,time,score,id}) => {
    const {state:{assessment,errorMsg}} = useContext(AssessmentContext);
    console.log(assessment?.assessment);
    console.log(errorMsg?.error);
    useEffect(()=>{
        goNextPage();
    },[])
    const goNextPage = () =>{
        errorMsg?.error ? navigation.navigate('ExamStackNavigation',{screen:'Result',params:{assessment:assessment}}) :navigation.navigate('ExamStackNavigation',{screen:'MCQ',params:{id:id}})
    }
    return (
        <View marginT-10>
            <Point title={"Exam Title"} text={`${title}- MCQ`}/>
            <Point title={"Deadline"} text={"You can start the exam anytime from now"}/>
            <Point title={"Exam Time"} text={time}/>
            {
                assessment?.assessment?.exam_started_at !== null &&
                (
                    assessment?.assessment?.score == 0
                        ? (<Point title={"Your Score"} text={"Under Review"}/>)
                        : (<Point title={"Your Score"} text={score}/>)
                )

            }

            <View marginT-40>
                <TouchableOpacity onPress={goNextPage}>
                    <FilledBtn title={"Go to Exam"}/>
                </TouchableOpacity>
                <AlertOutlineBtn title={"Exam instruction"}/>
            </View>
        </View>
    );
};

export default Mcq;
