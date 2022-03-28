import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {Colors, View, TouchableOpacity, Text} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import {useIsFocused} from '@react-navigation/native';
import HeaderTitle from "../components/HeaderTitle";
import SearchField from "../components/formComponents/SearchField";
import FilterBtn from "../components/buttons/FilterBtn";
import JobCard from "../components/JobCard";
import JobDetailsInfo from "../components/JobDetailsComponents/JobDetailsInfo";
import {Feather} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SimpleLineIcons} from '@expo/vector-icons';
import JobResponsibility from "../components/JobDetailsComponents/JobResponsibility";
import JobDetailsHeader from "../components/JobDetailsComponents/JobDetailsHeader";
import JobResponsibilityBulletPoint from "../components/JobDetailsComponents/JobResponsiblityBulletPoint";
import VirtualizedView from "../components/VirtualizedView";
import FilledBtn from "../components/buttons/FilledBtn";
import useJobs from "../hooks/useJobs";

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const jobDetails = [
    {
        id: '501',
        responsiblities: [
            {id: '101', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
            {id: '102', text: 'Lorem ipsum dolor  adipiscing elit.'},
            {id: '103', text: 'Lorem ipsum dolor sit amet, consectetur  elit.'},
            {id: '104', text: 'Lorem sit amet, consectetur adipiscing elit.'},
            {id: '105', text: 'Lorem ipsum amet, consectetur adipiscing elit.'},
        ]
    },
    {
        id: '502',
        requirements: [
            {id: '201', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
            {id: '202', text: 'Lorem ipsum dolor  adipiscing elit.'},
            {id: '203', text: 'Lorem ipsum dolor sit amet, consectetur  elit.'},
            {id: '204', text: 'Lorem sit amet, consectetur adipiscing elit.'},
            {id: '505', text: 'Lorem ipsum amet, consectetur adipiscing elit.'},
        ]
    }

]


const JobDetails = ({route, navigation}) => {
    const {title} = route.params;
    const [jobs] = useJobs();
    //console.log(jobs);
    const selectedJob = jobs.find(job => title === job.title);
    //console.log("selected Job", selectedJob?.title);
    if (!selectedJob) {
        return null;
    }
    const removeTags = (str)=>{
        return str.replace( /(<([^>]+)>)/ig, '');
    }

    const createPoint=(str)=>{
        str = str.toString();
        console.log("With end Tags: ",str);
        str =  str.replace( /(<([^>]+)>)/ig, '');
        console.log("without  Tags: ",str);
        str = str.split('\n');
        console.log('create array:',str);
        str.shift();
        str.pop();
        //console.log('remove first  and last element array:',str);
        let points = str.map(point => point.replace('&amp;','&'));
        //console.log("points",points);
        return points;
    }
/*
    const createPoints=(text)=>{
        text = text.toString();
        return text.replace( /(<([^>]+)>)/ig, '');
        console.log(text);
        return text;
    }*/
    return (
        <SafeAreaView style={{flex: 1}}>
            <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
            <View style={{flex: 1}}>
                <JobDetailsHeader name={'Jobs Details'} navigation={navigation}/>
                <View paddingH-16 style={{backgroundColor: Colors.blue}} paddingB-12>
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
                                    text={removeTags(selectedJob?.job_contexts[8]?.description)} IconLib={SimpleLineIcons}/>
                </View>

                <VirtualizedView>
                    <View marginB-60>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={createPoint(selectedJob?.job_contexts[3]?.description)} title={"Job Responsibilites"}
                                               value={"res-value"}/>
                        </View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={createPoint(selectedJob?.job_contexts[4]?.description)} title={"Educational Requirements"}
                                               value={"req-value"}/>
                        </View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={createPoint(selectedJob?.job_contexts[6]?.description)} title={"Which Skills Should You Have?"}
                                               value={"skill-value"}/>
                        </View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={createPoint(selectedJob?.job_contexts[7]?.description)} title={"Compensation"}
                                               value={"compensation-value"}/>
                        </View>

                    </View>
                </VirtualizedView>

                <View style={{position: 'absolute', width: '98%', top: '91.5%'}}>
                    <TouchableOpacity marginH-16 marginV-10 onPress={() => navigation.navigate('Apply')}
                                      style={{resizeMode: 'contain'}}>
                        <FilledBtn title={"Apply Now"}/>
                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    );
};


export default JobDetails;
