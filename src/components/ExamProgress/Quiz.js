import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Colors, RadioGroup, RadioButton} from 'react-native-ui-lib';
import HTMLView from 'react-native-htmlview';


const Quiz = ({navigation, route,title,answer1,answer2,answer3,answer4}) => {
    const [radioBtnColor,setRadioBtnColor]= useState(null);
    const removeTags = (str) => {
        str =  str.replace(/(<([^>]+)>)/ig, '');
        str = str.replace('&amp;', '&');
        str = str.replace('&nbsp;', '');
        str = str.replace('&rsquo;', "'");
        return str;
    }
    return (
        <View>
            <Text subtitle3 deepGray marginB-10>{title && removeTags(title)}</Text>
            <RadioGroup>
                {answer1 && <RadioButton value={"answer1"} label={answer1 && removeTags(answer1)} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray}/>}
                {answer2 && <RadioButton value={"answer2"} label={answer2 && removeTags(answer2)} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray}/>}
                {answer3 && <RadioButton value={"answer3"} label={answer3 && removeTags(answer3)} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray}/>}
                {answer4 && <RadioButton value={"answer4"} label={answer4 && removeTags(answer4)} marginB-10 labelStyle={{
                    fontSize: 14,
                    fontFamily: 'Montserrat_500Medium'
                }} color={Colors.gray}/>}
            </RadioGroup>

        </View>
    );
};


export default Quiz;