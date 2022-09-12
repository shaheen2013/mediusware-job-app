import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { WebView } from 'react-native-webview';
import FilledBtn from "../components/buttons/FilledBtn";
import CommonHeader from "../components/CommonHeader";
import ExamCard from "../components/ExamProgress/ExamCard";
import { Context as AssessmentContext } from "../contexts/AssessmentContext";
import { Context as AuthContext } from "../contexts/AuthContext";
const toastConfig = {
    tomatoToast: ({ text1, props }) => (
        <View
            style={{ height: 80,
                backgroundColor: Colors.borderColor,
                borderRadius:10,
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                opacity:1,
                borderLeftWidth:5,
                borderLeftColor:Colors.warningColor,
                marginHorizontal:16,
                paddingHorizontal:16,

            }}>
            <Ionicons name="warning" size={40} color={Colors.warningColor} />
            <Text subtitle1 warningColor>{text1}</Text>
        </View>
    )
};

const scalesPageToFit = Platform.OS === 'android';

 const htmlContent = `<div>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
            <h1>This is for testing html view for checking how it works on app store console...</h1>
    </div>`;
 

const MCQScreen = ({navigation, route}) => {
    const {state:{token}} = useContext(AuthContext);
    const {id} = route.params;

    const {state:{assessment,errorMsg}, clearErrorMsg,getAssessment,getQuizQuestion,startExam,startReExam} = useContext(AssessmentContext);
    useEffect(()=>{
        getAssessment(token,id);
    },[token])
    const startingExam = () =>{
           if(assessment?.assessment?.exam_started_at === null){
               startExam(token,id, ()=>{
                   startingExamination();
               })
           }else{

               startingExamination();
           }
    }

    const startingExamination = () =>{
        startReExam(token,id, ()=>{
            getQuizQuestion(token,id,()=>{
                clearErrorMsg();
                navigation.navigate('McqQuiz',{id: id});
            },()=>{
               navigation.navigate('Result',{assessment:assessment});
            });
        })
    }

    useEffect(() => {
        showToast();
        clearErrorMsg();
    }, [errorMsg?.error])

    const showToast = () => {
        errorMsg?.error && Toast.show({
            type: 'tomatoToast',
            text1: ` ${errorMsg?.error}`
        })
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <CommonHeader name={"MCQ"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            {
                assessment?.assessment === undefined ?
                    (<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <ActivityIndicator size={50} color="#0000ff" style={{height:80}}/>
                    </View>):
                <View paddingH-16 marginT-20 style={{flex: 1}}>
                <Text subtitle1 deepGray
                      marginB-10>{assessment?.assessment?.candidate_job?.job?.title} -
                    MCQ</Text>
                <ExamCard
                    score={assessment?.assessment?.assessment?.score}
                    duration={assessment?.assessment?.assessment?.duration}
                    passScore={assessment?.assessment?.assessment?.pass_score}
                />
                  {/* <ScrollView showsVerticalScrollIndicator={false}>  */}
                 <WebView
                    style={{marginTop:20,padding:8,flex:1,transform:[{ scale: 1 }]}}
                    automaticallyAdjustContentInsets={false}
                    scalesPageToFit={scalesPageToFit}
                    // bounces={false}
                    // scrollEnabled={false}
                     showsVerticalScrollIndicator={false}
                     showsHorizontalScrollIndicator={false}
                    originWhitelist={['*']}
                    source={{ html: assessment?.assessment?.assessment?.description}}
                    />

                {/* </ScrollView>  */}
                <TouchableOpacity marginV-10 onPress={startingExam}>
                    <FilledBtn title={'Start Exam'}/>
                </TouchableOpacity>
                <Toast
                    config={toastConfig}
                    visibilityTime={3000}
                    position='top'
                />
            </View>}
        </SafeAreaView>
    );
};

export default MCQScreen;

const styles = StyleSheet.create({
    p: {
      backgroundColor:'lightblue',
      fontWeight: '300',
      color: '#FF3366', 
    },
  });