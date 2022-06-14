import React,{useContext} from 'react';
import {Colors, Text, View,TouchableOpacity} from 'react-native-ui-lib';
import Point from "./Point";
import FilledBtn from "../buttons/FilledBtn";
import AlertOutlineBtn from "../buttons/AlertOutlineBtn";
import {Context as AssessmentContext} from "../../contexts/AssessmentContext";
const Written = ({navigation,title,time,score,id}) => {
    const {state:{assessment,errorMsg}} = useContext(AssessmentContext);
    const goNextPage = () =>{
        navigation.navigate('ExamStackNavigation',{screen:'WrittenExam',params:{id:id}})
    }
    return (
        <View marginT-10>
            <Point title={"Exam Title"} text={`${title}- Written`}/>
            <Point title={"Deadline"} text={"You need to pass the previous exam."}/>
            <Point title={"Exam Time"} text={`${time} Minute`}/>
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

export default Written;
