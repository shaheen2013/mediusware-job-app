import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors, Image} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import {StatusBar, ScrollView} from "react-native";
import FilledBtn from "../components/buttons/FilledBtn";


const ResultScreen = ({navigation, route}) => {

    return (
        <SafeAreaView style={{flex: 1,paddingHorizontal:16}}>
            <CommonHeader name={"Result"} navigation={navigation}/>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            <View  marginT-20 style={{flex: 8, alignItems: 'center'}}>
                <Image source={require("../../assets/images/Result.png")}/>
                <Text text blackGray center marginV-20>
                    Thanks for completing Mediusware
                    SENIOR SOFTWARE ENGINEER (PHP, Laravel)- MCQ test! Keep eye on the Mediusware job board to get further updates
                </Text>
                <Text subtitle3 blackGray center marginV-10>
                    Your score: 00, you ended this exam at Tu 11 2022 6:20pm
                </Text>
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