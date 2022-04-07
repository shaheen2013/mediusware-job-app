import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import {ImageBackground, StatusBar} from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const DashBoardScreen = ({navigation, route}) => {
    console.log(navigation);
    return (
        <SafeAreaView>
            <CommonHeader name={'Dashboard'} navigation={navigation}/>
            <View paddingH-16>
                <Text caption color={Colors.gray} marginT-20->Hello, Jack</Text>
                <View row marginB-10 marginT-6>
                    <Text subTitleText deepGray>Welcome to</Text>
                    <Text subTitleText blue> Candidate Dashboard!</Text>
                </View>
                <Text text deepGray>Check out our latest events and offers and keep learning everyday!</Text>
                <Text subtitle1 deepGray marginT-20 marginB-10>Applied Job</Text>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: Colors.borderColor,
                        borderRadius: 16,
                        overflow: 'hidden'
                    }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ExamProgress')}>
                        <ImageBackground source={require('../../assets/images/bgJobCard.jpg')} style={{
                            padding: 16,
                            resizeMode: 'cover',
                            justifyContent: 'center',
                        }}>
                            <View row style={{justifyContent: 'space-between'}}>
                                <Text gray caption>You have applied for the job</Text>
                                <Text gray text>20 Dec, 2022</Text>
                            </View>

                            <Text subtitle3 gray marginV-8>SENIOR SOFTWARE ENGINEER (PHP,SQl, Laravel) </Text>
                            <Text subtitle3 gray>Exp.Salary: <Text blue> 25,000</Text></Text>
                        </ImageBackground>
                    </TouchableOpacity>

                </View>
                <View>
                    <Text deepGray subtitle1 marginT-20 marginB-10>Calendar</Text>
                    <Calendar
                        style={{borderColor: Colors.borderColor, borderRadius: 10, borderWidth: 1}}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
};

export default DashBoardScreen;