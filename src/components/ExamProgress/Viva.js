import React from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import Point from "./Point";
import FilledBtn from "../buttons/FilledBtn";
import AlertOutlineBtn from "../buttons/AlertOutlineBtn";
const Viva = ({title}) => {
    return (
        <View marginT-10>
            <Point title={"Exam Title"} text={`${title}- Viva`}/>
            <Point title={"Deadline"} text={"You need to pass the previous exam."}/>
            <Point title={"Exam Time"} text={"120 Minute"}/>
            <Point title={"Your Score"} text={"00"}/>
            <View marginT-40>
                <FilledBtn title={"Go to Exam"}/>
                <AlertOutlineBtn title={"Exam instruction"}/>
            </View>
        </View>
    );
};

export default Viva;