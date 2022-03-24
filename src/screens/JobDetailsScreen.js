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

    return (
        <SafeAreaView style={{flex: 1}}>
            <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
            <View style={{flex: 1}}>
                <JobDetailsHeader name={'Jobs Details'} navigation={navigation}/>
                <View paddingH-16 style={{backgroundColor: Colors.blue}} paddingB-12>
                    <Text h4 marginV-12 white>UX UI Designer</Text>
                    <JobDetailsInfo icon={"calendar"} title={"Published:"} text={"12-12-2021"} IconLib={Feather}/>
                    <JobDetailsInfo icon={"calendar"} title={"Deadline:"} text={"02-04-2022"} IconLib={Feather}/>
                    <JobDetailsInfo icon={"account-search-outline"} title={"Vacancies:"} text={"12"}
                                    IconLib={MaterialCommunityIcons}/>
                    <JobDetailsInfo icon={"users"} title={"Experience:"} text={"2 Years +"} IconLib={Feather}/>
                    <JobDetailsInfo icon={"currency-usd-circle-outline"} title={"Salary:"} text={"25,000-30,000"}
                                    IconLib={MaterialCommunityIcons}/>
                    <JobDetailsInfo icon={"location-pin"} title={"Location:"}
                                    text={"Ring Road, House 18/5, Dhaka, 1207"} IconLib={SimpleLineIcons}/>
                </View>

                <VirtualizedView>
                    <View marginB-20>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={jobDetails[0].responsiblities} title={"Job Responsibilites"}
                                               value={"res-value"}/>
                        </View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={jobDetails[1].requirements} title={"Experience Requirements"}
                                               value={"req-value"}/>
                        </View>
                        <View marginT-20 paddingR-16>
                            <JobResponsibility points={jobDetails[0].responsiblities} title={"Job Responsibilites"}
                                               value={"req2-value"}/>
                        </View>
                        <TouchableOpacity marginH-16 marginV-10 onPress={() => navigation.navigate('Apply')}>
                            <FilledBtn title={"Apply Now"}/>
                        </TouchableOpacity>

                    </View>
                </VirtualizedView>

            </View>
        </SafeAreaView>
    );
};


export default JobDetails;
