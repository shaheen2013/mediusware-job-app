import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Colors, RadioGroup, RadioButton} from 'react-native-ui-lib';



const McqQuizScreen = ({navigation, route}) => {
    const [radioBtnColor,setRadioBtnColor]= useState(null);

    return (
        <View>
            <Text subtitle3 deepGray marginB-10>What Learn Portal?</Text>
            <RadioGroup>
                <RadioButton value={"answer1"} label={"Answer 1"} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray}/>
                <RadioButton value={"answer2"} label={"Answer 2"} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray}/>
                <RadioButton value={"answer3"} label={"Answer 3"} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray} />
                <RadioButton value={"answer4"} label={"Answer 4"} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray}/>
            </RadioGroup>

        </View>
    );
};


export default McqQuizScreen;