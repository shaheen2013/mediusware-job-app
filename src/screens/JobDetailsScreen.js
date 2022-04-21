import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {Colors, View, TouchableOpacity, Text} from 'react-native-ui-lib';
import {useIsFocused} from '@react-navigation/native';
import JobDetailsInfo from "../components/JobDetailsComponents/JobDetailsInfo";
import {Feather} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SimpleLineIcons} from '@expo/vector-icons';
import JobResponsibility from "../components/JobDetailsComponents/JobResponsibility";
import JobDetailsHeader from "../components/JobDetailsComponents/JobDetailsHeader";
import VirtualizedView from "../components/VirtualizedView";
import FilledBtn from "../components/buttons/FilledBtn";
import useJobs from "../hooks/useJobs";

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}


const JobDetails = ({route, navigation}) => {
    const {slug} = route.params;
    const [jobs] = useJobs();
    const selectedJob = jobs.find(job => slug === job.slug);
    if (!selectedJob) {
        return null;
    }
    const removeTags = (str) => {
        return str.replace(/(<([^>]+)>)/ig, '');
    }

    const createPoint = (str) => {
        str = str.toString();
        str = str.replace(/(<([^>]+)>)/ig, '');
        str = str.split('\n');
        let points = str.map(point => point.replace('&amp;', '&'));
        points = points.map(point => point.replace('&nbsp;', ''));
        points = points.filter(point => point.length > 1);
        return points;
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
            <View style={{flex: 1}}>
                <JobDetailsHeader name={'Jobs Details'} navigation={navigation}/>
                <View style={{backgroundColor: Colors.blue}} paddingB-12 paddingH-16>
                    <Text h4 marginV-12 white>{selectedJob?.title}</Text>
                    <JobDetailsInfo icon={"calendar"} title={"Published:"} text={selectedJob?.updated_at}
                                    IconLib={Feather}/>
                    <JobDetailsInfo icon={"calendar"} title={"Deadline:"}
                                    text={selectedJob?.job_summery?.application_deadline} IconLib={Feather}/>
                    <JobDetailsInfo icon={"account-search-outline"} title={"Vacancies:"}
                                    text={selectedJob?.job_summery?.vacancy}
                                    IconLib={MaterialCommunityIcons}/>
                    <JobDetailsInfo icon={"users"} title={"Experience:"} text={selectedJob?.job_summery?.experience}
                                    IconLib={Feather}/>
                    <JobDetailsInfo icon={"currency-usd-circle-outline"} title={"Salary:"}
                                    text={selectedJob?.job_summery?.salary_range}
                                    IconLib={MaterialCommunityIcons}/>
                    <JobDetailsInfo icon={"location-pin"} title={"Location:"}
                                    text={"Ring Road, Mohammadpur, House 18/5, Floor 2nd, Dhaka, 1207"}
                                    IconLib={SimpleLineIcons}/>
                </View>
                {/*Customized Flatlist instead of Scrollview because flatlist and scrollview cann't work together */}
                <VirtualizedView>
                    <View marginB-60>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={createPoint(selectedJob?.job_contexts[3]?.description)}
                                               title={"Job Responsibilites"}
                                               value={"res-value"}/>
                        </View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={createPoint(selectedJob?.job_contexts[4]?.description)}
                                               title={"Educational Requirements"}
                                               value={"req-value"}/>
                        </View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={createPoint(selectedJob?.job_contexts[6]?.description)}
                                               title={"Which Skills Should You Have?"}
                                               value={"skill-value"}/>
                        </View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={createPoint(selectedJob?.job_contexts[7]?.description)}
                                               title={"Compensation"}
                                               value={"compensation-value"}/>
                        </View>

                    </View>
                </VirtualizedView>
                <View style={{position: 'absolute', width: '98%', top: '91.5%'}}>
                    <TouchableOpacity marginH-16 marginV-10 onPress={() => navigation.navigate('Apply',{title:selectedJob?.title,job_slug:slug})}
                                      style={{resizeMode: 'contain'}}>
                        <FilledBtn title={"Apply Now"}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default JobDetails;
