import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Colors, RadioGroup, RadioButton,Checkbox} from 'react-native-ui-lib';

const Quiz = ({navigation, route,title,answers,answer1,answer2,answer3,answer4,selection,setSelection,type,selectedAnswers,setSelectedAnswers}) => {
    // console.log(answers,"answers............");
    const [radioBtnColor,setRadioBtnColor]= useState(null);
   // const [allAnswers,setAllAnswers] = useState(answers);
   // const [selectBox,setSelectBox] = useState({});
    const [value,setValue] = useState({value1:false,value2:false,value3:false,value4:false});

    const removeTags = (str) => {
        str =  str.replace(/(<([^>]+)>)/ig, '');
        str = str.replace('&amp;', '&');
        str = str.replace('&nbsp;', '');
        str = str.replace('&rsquo;', "'");
        return str;
    }

    useEffect(()=>{
       // setSelectedAnswers(selection);
       setValue({value1:false,value2:false,value3:false,value4:false});
    },[title])

    // const onSelectionsChange = (selectedAnswer) => {
    //     setSelectedAnswers({ selectedAnswer})
    // }

    useEffect(()=>{

    },[value])

const isChecked = (val,id,valueName) =>{
        console.log(valueName);
    // console.log('id',id, value, "value")

    const newValue = {...value};
    newValue[valueName] = val;
    setValue(newValue)
    console.log(newValue);
    const idExists = selectedAnswers.find(indexId => indexId === id);
    if(val === true){
        console.log(idExists);
        console.log(selectedAnswers);
        if(!idExists){
            setSelectedAnswers([...selectedAnswers,id])
            console.log(selectedAnswers);
        }
    }
    if(val === false){
        if(idExists){
            setSelectedAnswers(selectedAnswers.filter(el=> el !== id));
            console.log(selectedAnswers);
        }
    }

}
    return (
        <View>
            <Text subtitle3 deepGray marginB-10>{title && removeTags(title)}</Text>
            {
                type === "multiple_choice" ? <View>
                    {answer1 && <View marginB-10>
                        <Checkbox
                            value={value.value1}
                            label={answer1 && removeTags(answer1?.title)}
                            onValueChange={(value)=>isChecked(value,answer1?.id,"value1")}
                            color={Colors.gray}
                            labelStyle={{
                                fontSize: 14,
                                fontFamily: 'Montserrat_500Medium'
                            }}

                        />
                    </View>}

                    {answer2 && <View marginB-10>
                        <Checkbox
                            value={value.value2}
                            label={answer2 && removeTags(answer2?.title)}
                            onValueChange={(value)=>isChecked(value,answer2?.id,"value2")}
                            color={Colors.gray}
                            labelStyle={{
                                fontSize: 14,
                                fontFamily: 'Montserrat_500Medium'
                            }}

                        />
                    </View>}

                    {answer3 && <View marginB-10>
                        <Checkbox
                            value={value.value3}
                            label={answer3 && removeTags(answer3?.title)}
                            onValueChange={(value)=>isChecked(value,answer3?.id,"value3")}
                            color={Colors.gray}
                            labelStyle={{
                                fontSize: 14,
                                fontFamily: 'Montserrat_500Medium'
                            }}

                        />
                    </View>}

                    {answer4 && <View marginB-10>
                        <Checkbox
                            value={value.value4}
                            label={answer4 && removeTags(answer4?.title)}
                            onValueChange={(value)=>isChecked(value,answer4?.id,"value4")}
                            color={Colors.gray}
                            labelStyle={{
                                fontSize: 14,
                                fontFamily: 'Montserrat_500Medium'
                            }}

                        />
                    </View>
                    }
                </View>:
                    <RadioGroup onValueChange={value => setSelectedAnswers([value])}>
                        {answer1 && <RadioButton value={answer1?.id} label={answer1 && removeTags(answer1?.title)} marginB-10 labelStyle={{
                            fontSize: 14,
                            fontFamily: 'Montserrat_500Medium'
                        }} color={Colors.gray}/>}
                        {answer2 && <RadioButton value={answer2?.id} label={answer2 && removeTags(answer2?.title)} marginB-10 labelStyle={{
                            fontSize: 14,
                            fontFamily: 'Montserrat_500Medium'
                        }} color={Colors.gray}/>}
                        {answer3 && <RadioButton value={answer3?.id} label={answer3 && removeTags(answer3?.title)} marginB-10 labelStyle={{
                            fontSize: 14,
                            fontFamily: 'Montserrat_500Medium'
                        }} color={Colors.gray}/>}
                        {answer4 && <RadioButton value={answer4?.id} label={answer4 && removeTags(answer4?.title)} marginB-10 labelStyle={{
                            fontSize: 14,
                            fontFamily: 'Montserrat_500Medium'
                        }} color={Colors.gray}/>}
                    </RadioGroup>
            }

        </View>
    );
};


export default Quiz;