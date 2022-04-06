import React from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import Point from "./Point";
import FilledBtn from "../buttons/FilledBtn";
import AlertOutlineBtn from "../buttons/AlertOutlineBtn";
const Mcq = () => {
    return (
        <View marginT-10>
            <Point title={"Exam Title"} text={"SENIOR SOFTWARE ENGINEER (PHP, Laravel)- MCQ"}/>
            <Point title={"Deadline"} text={"You can start the exam anytime from now"}/>
            <Point title={"Exam Time"} text={"25 Minute"}/>
            <Point title={"Your Score"} text={33}/>
            <View marginT-40>
                <FilledBtn title={"Go to Exam"}/>
                <AlertOutlineBtn title={"Exam instruction"}/>
            </View>
        </View>
    );
};

export default Mcq;
