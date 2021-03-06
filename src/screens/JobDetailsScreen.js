import { Feather, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useIsFocused   } from '@react-navigation/native';
import React, {useEffect, useState,useContext} from 'react';
import { StatusBar,ActivityIndicator,StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import FilledBtn from "../components/buttons/FilledBtn";
import JobDetailsHeader from "../components/JobDetailsComponents/JobDetailsHeader";
import JobDetailsInfo from "../components/JobDetailsComponents/JobDetailsInfo";
import JobResponsibility from "../components/JobDetailsComponents/JobResponsibility";
import VirtualizedView from "../components/VirtualizedView";
import useSingleJob from "../hooks/useSingleJob";
import { BlurView } from 'expo-blur';
import {Context as AuthContext} from "../contexts/AuthContext";
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const JobDetails = ({route,navigation}) => {
    const {slug} = route.params;
    const [singleJob,isLoading] = useSingleJob(slug);
    const {state:{token}} = useContext(AuthContext);

    if (!singleJob) {
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

    const navigateApply= () =>{
        if(token){
            navigation.navigate('ApplicantInformation',{title:singleJob?.title,job_slug:slug});
        }else{
            navigation.navigate('Apply',{title:singleJob?.title,job_slug:slug});
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
            <JobDetailsHeader name={'Jobs Details'} navigation={navigation}/>
            {isLoading ?
                (<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size={50} color="#0000ff" style={{height:80}}/>
                </View>)
                :
                    (
                        <View style={{flex: 1}}>
                            {singleJob?.job_summery &&
                                <View style={{backgroundColor: Colors.blue}} paddingB-12 paddingH-16>
                                <Text h4 marginV-8 white>{singleJob?.title}</Text>
                                    <View>
                                        <View>
                                            <JobDetailsInfo icon={"calendar"} title={"Published:"} text={singleJob?.updated_at}
                                                            IconLib={Feather}/>
                                            <JobDetailsInfo icon={"calendar"} title={"Deadline:"}
                                                            text={singleJob?.job_summery?.application_deadline} IconLib={Feather}/>
                                        </View>
                                        <View>
                                            <JobDetailsInfo icon={"account-search-outline"} title={"Vacancies:"}
                                                            text={singleJob?.job_summery?.vacancy}
                                                            IconLib={MaterialCommunityIcons}/>
                                            <JobDetailsInfo icon={"users"} title={"Experience:"}
                                                            text={singleJob?.job_summery?.experience}
                                                            IconLib={Feather}/>
                                        </View>

                                    </View>
                                    <JobDetailsInfo icon={"currency-usd-circle-outline"} title={"Salary:"}
                                                    text={singleJob?.job_summery?.salary_range}
                                                    IconLib={MaterialCommunityIcons}/>
                                <JobDetailsInfo icon={"location-pin"} title={"Location:"}
                                                text={"Ring Road, Mohammadpur, House 18/5, Floor 2nd, Dhaka, 1207"}
                                                IconLib={SimpleLineIcons}/>
                            </View>
                            }
                        {/*Customized Flatlist instead of Scrollview because flatlist and scrollview cann't work nested together */}
                        {

                            <VirtualizedView>
                                {
                                        singleJob?.job_contexts &&
                                        <View marginB-60>
                                            <View marginT-20 paddingR-16>
                                                <JobResponsibility points={createPoint(singleJob?.job_contexts[3]?.description)}
                                                                   title={"Job Responsibilites"}
                                                                   value={"res-value"}/>
                                            </View>
                                            <View marginT-20 paddingR-16>
                                                <JobResponsibility points={createPoint(singleJob?.job_contexts[4]?.description)}
                                                                   title={"Educational Requirements"}
                                                                   value={"req-value"}/>
                                            </View>
                                            <View marginT-20 paddingR-16>
                                                <JobResponsibility points={createPoint(singleJob?.job_contexts[6]?.description)}
                                                                   title={"Which Skills Should You Have?"}
                                                                   value={"skill-value"}/>
                                            </View>
                                            <View marginT-20 paddingR-16>
                                                <JobResponsibility points={createPoint(singleJob?.job_contexts[7]?.description)}
                                                                   title={"Compensation"}
                                                                   value={"compensation-value"}/>
                                            </View>

                                        </View>
                                }

                            </VirtualizedView>
                        }

                            {singleJob?.job_summery &&
                                    <View style={styles.applyBtnStyle} >
                                        <TouchableOpacity marginB-16  onPress={navigateApply}>
                                                <FilledBtn title={"Apply Now"}/>
                                        </TouchableOpacity>


                                    </View>


                            }
                    </View>)
                }
        </SafeAreaView>
    );
};

export default JobDetails;

const styles = StyleSheet.create({
    applyBtnStyle:{
        marginTop:20,
        position: 'absolute',
        alignSelf:'center',
        width: screenWidth - 32,
        top: '90%',
        backgroundColor:'white',
        borderTopEndRadius:16,
        borderTopLeftRadius: 16,

    }
})