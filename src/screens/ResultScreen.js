import moment from "moment";
import React, { useEffect, useState } from 'react';
import { StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import FilledBtn from "../components/buttons/FilledBtn";
import CommonHeader from "../components/CommonHeader";


const ResultScreen = ({navigation, route}) => {
    const {assessment} = route.params;
    const [date,setDate] = useState(null);
    useEffect(()=>{
        const convertDate =
        moment(assessment?.assessment?.exam_end_at).format('llll')
        setDate(convertDate);
    },[assessment?.assessment?.exam_end_at])

    return (
        <SafeAreaView style={{flex: 1,paddingHorizontal:16}}>
            <CommonHeader name={"Result"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View  marginT-20 style={{flex: 8, alignItems: 'center'}}>
                <Image source={require("../../assets/images/Result.png")}/>
                <Text text blackGray center marginV-20>
                    Thanks for completing Mediusware {" "}
                    <Text btn_text>{assessment?.assessment?.candidate_job?.job?.title.toUpperCase()}- MCQ</Text> test! Keep eye on the Mediusware job board to get further updates
                </Text>
                <Text h4 blackGray center marginV-10>
                    Your score: <Text title>{assessment?.assessment?.score > 0 ? assessment?.assessment?.score : "Under Review" }</Text>
                </Text>
                <Text subtitle2 blackGray center>You ended this exam at</Text>
                <Text subtitle1 blackGray center>{date}</Text>
            </View>

            <View flex-1>
                <TouchableOpacity marginV-15 onPress={() =>navigation.navigate('Dashboard')}>
                    <FilledBtn title={'Go to DashBoard'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


export default ResultScreen;