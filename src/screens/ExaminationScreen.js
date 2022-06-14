import React,{useContext,useEffect} from 'react';
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
import ExaminationCard from "../components/ExaminationCard";
import {Context as AssessmentContext} from "../contexts/AssessmentContext";
import {Context as AuthContext} from "../contexts/AuthContext";
import VirtualizedView from "../components/VirtualizedView";

const ExaminationScreen = ({navigation, route}) => {
    const {state:{token}} = useContext(AuthContext);
   // const [apply,loader,onRefresh,refreshing] = useApply();
    const {state:{allAssessments,errorMsg},getAllAssessment} = useContext(AssessmentContext);

    useEffect(() => {
        getAllAssessment(token);
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex:1}}>
                <CommonHeader name={'Examination'} navigation={navigation}/>
                <View paddingH-16 style={{flex:1}}>
                    <VirtualizedView>
                        <Text subtitle1 deepGray marginT-20 marginB-10>Upcoming Exam</Text>
                        <FlatList
                            /*  refreshControl={
                                  <RefreshControl
                                      colors={[Colors.blue]}
                                      refreshing={refreshing}
                                      onRefresh={onRefresh} />
                              }*/
                            showsVerticalScrollIndicator={false}
                            data={allAssessments?.allAssessments}
                            keyExtractor={(item) => item.unique_id}
                            listKey={"examNotstarted"}
                            renderItem={({item}) => {
                                return item?.exam_started_at ===null &&
                                    <ExaminationCard
                                        type={item?.assessment?.type}
                                        title={item?.assessment?.title}
                                        examStart={item?.exam_started_at}
                                />
                            }}/>
                        <Text subtitle1 deepGray marginT-20 marginB-10>Exam Result</Text>
                        <FlatList
                            /*  refreshControl={
                                  <RefreshControl
                                      colors={[Colors.blue]}
                                      refreshing={refreshing}
                                      onRefresh={onRefresh} />
                              }*/
                            showsVerticalScrollIndicator={false}
                            data={allAssessments?.allAssessments}
                            listKey={"examStarted"}
                            keyExtractor={(item) => item.unique_id}
                            renderItem={({item}) => {
                                return (
                                    item?.exam_started_at  &&
                                    <ExaminationCard
                                        type={item?.assessment?.type}
                                        title={item?.assessment?.title}
                                        examStart={item?.exam_started_at}
                                        totalScore={item?.assessment?.score}
                                        score={item?.score}
                                    />
                                )
                            }}/>
                    </VirtualizedView>

                </View>

            </View>
        </SafeAreaView>
    );
};

export default ExaminationScreen;