import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Colors, RadioGroup, RadioButton} from 'react-native-ui-lib';



const Quiz = ({navigation, route,title,answer1,answer2,answer3,answer4}) => {
    const [radioBtnColor,setRadioBtnColor]= useState(null);

    return (
        <View>
            <Text subtitle3 deepGray marginB-10>{title}</Text>
            <RadioGroup>
                <RadioButton value={"answer1"} label={answer1} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray}/>
                <RadioButton value={"answer2"} label={answer2} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray}/>
                <RadioButton value={"answer3"} label={answer3} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray} />
                <RadioButton value={"answer4"} label={answer4} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray}/>
            </RadioGroup>

        </View>
    );
};


export default Quiz;