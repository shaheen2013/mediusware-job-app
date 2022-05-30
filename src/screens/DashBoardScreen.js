import React,{useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import {ImageBackground, StatusBar, ScrollView, RefreshControl, FlatList, ActivityIndicator} from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import useCandidate from "../hooks/useCandidate";
import useApply from "../hooks/useApply";
import {Context as UserContext} from "../contexts/UserContext";
import JobCard from "../components/JobCard";
import DashBoardCard from "../components/DashBoardCard";
import VirtualizedList from "../components/VirtualizedList ";

const DashBoardScreen = ({navigation, route}) => {
    const {state:{user}} = useContext(UserContext);
    const [apply,loader,onRefresh,refreshing] = useApply();
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex:1}}>
                <CommonHeader name={'Dashboard'} navigation={navigation}/>
                <View paddingH-16 style={{flex:1}}>
                    <Text caption color={Colors.gray} marginT-20->Hello, {user?.user?.full_name?user?.user?.full_name.split(' ')[0]:'Jack'}</Text>
                    <View row marginB-10 marginT-6>
                        <Text subtitle1 deepGray>Welcome to</Text>
                        <Text subtitle1 blue> Candidate Dashboard!</Text>
                    </View>
                    <Text text deepGray>Check out our latest events and offers and keep learning everyday!</Text>
                        <Text subtitle1 deepGray marginT-20 marginB-10>Applied Job</Text>
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        colors={[Colors.blue]}
                                        refreshing={refreshing}
                                        onRefresh={onRefresh} />
                                }
                                showsVerticalScrollIndicator={false}
                                data={apply}
                                keyExtractor={(item) => item.unique_id}
                                //keyExtractor={(item,index)=> item.key}
                                renderItem={({item}) => {
                                    return <DashBoardCard
                                        singleApply={item}
                                        navigation={navigation}
                                    />
                                }}/>
                           {/* <View style={{marginBottom: 10}}>
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
                            </View>*/}


                </View>


            </View>
        </SafeAreaView>
    );
};

export default DashBoardScreen;