import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar, ScrollView, StyleSheet, ActivityIndicator} from "react-native";
import Point from "../components/ExamProgress/Point";
import ExamCard from "../components/ExamProgress/ExamCard";
import useApply from "../hooks/useApply";
import HTMLView from 'react-native-htmlview';

const MCQScreen = ({navigation, route}) => {
    const [apply,loader] = useApply();

    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"MCQ"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View paddingH-16 marginT-20 style={{flex:1}}>
               <Text subtitle1 deepGray marginB-10>SENIOR SOFTWARE ENGINEER (PHP, Laravel)- MCQ</Text>
                <ExamCard/>
                {/*<Text subtitle3 marginT-20 warningColor>STOP!!!</Text>
                <Text text marginT-10 warningColor>You can start the exam at any time but we prefer ASAP. And once you start you have to finish within the given allocated maximum hours.</Text>
                <Text subtitle1 deepGray marginT-10>Read before Starting Exam</Text>*/}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        apply?.candidate_assessment === undefined ?
                            (<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <ActivityIndicator size={50} color="#0000ff" style={{height:80}}/>
                            </View>)
                       :<HTMLView
                            value={ apply?.candidate_assessment && apply?.candidate_assessment[0]?.assessment?.description}
                            // style={styles}
                        />
                    }

                </ScrollView>
                <TouchableOpacity marginV-10 onPress={()=> navigation.navigate('McqQuiz')}>
                    <FilledBtn title={'Start Exam'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default MCQScreen;

// const styles = StyleSheet.create({
//     h1: {
//         fontSize: 14,
//         fontFamily: 'Montserrat_500Medium', // make links coloured pink
//         color:Colors.warningColor,
//         marginTop:20
//     },
// });