import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar,ScrollView} from "react-native";
import Quiz from "../components/ExamProgress/Quiz";
import OutlineBtn from "../components/buttons/OutlineBtn";


const McqQuizScreen = ({navigation, route}) => {

    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"MCQ"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 style={{flex:1}}>
                <View flex-9>
                    <Text subtitle1 deepGray marginB-10>SENIOR SOFTWARE ENGINEER (PHP, Laravel)- MCQ</Text>
                    <Quiz/>
                </View>
                <View row flex-1>
                    <TouchableOpacity flex-1 marginR-10 onPress={()=>navigation.navigate('Result')}>
                        <FilledBtn title={'Next'}/>

                    </TouchableOpacity>
                    <TouchableOpacity flex-1 onPress={()=>navigation.navigate('ExamProgress')}>
                        <OutlineBtn title={'Skip'}/>

                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    );
};


export default McqQuizScreen;