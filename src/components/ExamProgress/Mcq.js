import React from 'react';
import {Colors, Text, View,TouchableOpacity} from 'react-native-ui-lib';
import Point from "./Point";
import FilledBtn from "../buttons/FilledBtn";
import AlertOutlineBtn from "../buttons/AlertOutlineBtn";
const Mcq = ({navigation,title,time,score}) => {
    return (
        <View marginT-10>
            <Point title={"Exam Title"} text={`${title}- MCQ`}/>
            <Point title={"Deadline"} text={"You can start the exam anytime from now"}/>
            <Point title={"Exam Time"} text={time}/>
            <Point title={"Your Score"} text={score}/>
            <View marginT-40>
                <TouchableOpacity onPress={()=>navigation.navigate('ExamStackNavigation',{screen:'MCQ'})}>
                    <FilledBtn title={"Go to Exam"}/>
                </TouchableOpacity>
                <AlertOutlineBtn title={"Exam instruction"}/>
            </View>
        </View>
    );
};

export default Mcq;
