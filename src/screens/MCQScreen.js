import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar,ScrollView} from "react-native";
import Point from "../components/ExamProgress/Point";
import ExamCard from "../components/ExamProgress/ExamCard";

const MCQScreen = ({navigation, route}) => {

    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"MCQ"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 style={{flex:1}}>
               <Text subtitle1 deepGray marginB-10>SENIOR SOFTWARE ENGINEER (PHP, Laravel)- MCQ</Text>
                <ExamCard/>
                <Text subtitle3 marginT-20 warningColor>STOP!!!</Text>
                <Text text marginT-10 warningColor>You can start the exam at any time but we prefer ASAP. And once you start you have to finish within the given allocated maximum hours.</Text>
                <Text subtitle1 deepGray marginT-10>Read before Starting Exam</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text text gray marginV-10>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>4 . Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>5. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>6. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    <Text text gray marginV-10>7. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                </ScrollView>
                <TouchableOpacity marginV-10 onPress={()=> navigation.navigate('McqQuiz')}>
                    <FilledBtn title={'Start Exam'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default MCQScreen;