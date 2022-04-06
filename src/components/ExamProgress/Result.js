import React from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import Point from "./Point";
import FilledBtn from "../buttons/FilledBtn";
import AlertOutlineBtn from "../buttons/AlertOutlineBtn";
const Result = () => {
    return (
        <View marginT-10>
            <View row marginB-10>
                <Text flex-1 subtitle3 color={Colors.gray}>Exam MCQ</Text>
                <Text flex-2 subtitle3 color={Colors.blue} marginL-3>{33}</Text>
            </View>
            <View row marginB-10>
                <Text flex-1 subtitle3 color={Colors.gray}>Exam Written</Text>
                <Text flex-2 subtitle3 color={Colors.blue} marginL-3>{'00'}</Text>
            </View>
            <View row marginB-10>
                <Text flex-1 subtitle3 color={Colors.gray}>Exam Viva</Text>
                <Text flex-2 subtitle3 color={Colors.blue} marginL-3>{'00'}</Text>
            </View>


            <View marginT-40>
                <FilledBtn title={"Go to Dashboard"}/>
            </View>
        </View>
    );
};

export default Result;