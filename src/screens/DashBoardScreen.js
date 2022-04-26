import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import {ImageBackground, StatusBar,ScrollView} from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import useCandidate from "../hooks/useCandidate";
import useApply from "../hooks/useApply";

const DashBoardScreen = ({navigation, route}) => {
    const [user] = useCandidate();
    const [apply] = useApply();
    console.log(apply);
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex:1}}>
                <CommonHeader name={'Dashboard'} navigation={navigation}/>
                <View paddingH-16>
                    <Text caption color={Colors.gray} marginT-20->Hello, {user?.full_name?user?.full_name.split(' ')[0]:'Jack'}</Text>
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
            </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:10,paddingHorizontal:16}}>
                    <Text deepGray subtitle1 marginT-20 marginB-10>Calendar</Text>
                    <Calendar
                        style={{borderColor: Colors.borderColor, borderRadius: 10, borderWidth: 1}}
                        // Specify theme properties to override specific styles for calendar parts
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            textSectionTitleDisabledColor: '#d9e1e8',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: Colors.white,
                            todayBackgroundColor: Colors.blue,
                            dayTextColor: Colors.blackGray,
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: Colors.blackGray,
                            disabledArrowColor: '#d9e1e8',
                            monthTextColor: Colors.blackGray,
                            indicatorColor: 'blue',
                            textDayFontFamily: 'monospace',
                            textMonthFontFamily: 'monospace',
                            textDayHeaderFontFamily: 'monospace',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16
                        }}
                    />
                </ScrollView>

            </View>
        </SafeAreaView>
    );
};

export default DashBoardScreen;