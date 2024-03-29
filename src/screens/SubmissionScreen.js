import React from 'react';
import { StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import FilledBtn from "../components/buttons/FilledBtn";
import CommonHeader from "../components/CommonHeader";


const SubmissionScreen = ({navigation,route}) => {
    const {title, job_slug} = route.params;
    return (
        <SafeAreaView style={{flex:1}}>
                <View flex-1>
                    <CommonHeader name="Submission Status" navigation={navigation}/>
                    <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
                </View>
                <View flex-12 paddingH-16>
                    <View style={{alignItems:'center'}} flex-8>
                        <Image source={require("../../assets/images/success.png")} />
                        <Text h4 blue marginT-20 marginB-10>Successful</Text>
                        <Text gray text style={{textAlign:'center'}}>Your job application for {title} at Mediusware has successfully completed.
                            After initial screening process we will get back to you. </Text>
                    </View>
                    <View flex-1>
                        <TouchableOpacity marginV-15 onPress={() =>navigation.navigate('BottomNavigation',{screen:'Home'})}>
                            <FilledBtn title={'Go to Home'}/>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
};

export default SubmissionScreen;
