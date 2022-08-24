import { Feather, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, FlatList, StatusBar, StyleSheet, Text } from 'react-native';
import { Colors, TouchableOpacity, View } from 'react-native-ui-lib';
import FilledBtn from "../components/buttons/FilledBtn";
import JobDetailsHeader from "../components/JobDetailsComponents/JobDetailsHeader";
import JobDetailsInfo from "../components/JobDetailsComponents/JobDetailsInfo";
import JobResponsibility from "../components/JobDetailsComponents/JobResponsibility";
import { Context as AuthContext } from "../contexts/AuthContext";
import useSingleJob from "../hooks/useSingleJob";


const screenWidth = Dimensions.get('window').width;
function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const hSecHeight = 270;
const offsetY = 0;

const JobDetails = ({route,navigation}) => {
    const {slug} = route.params;
    const [singleJob,isLoading] = useSingleJob(slug);
    const {state:{token}} = useContext(AuthContext);
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    const animatedValue = new Animated.Value(0);
    const [header,setHeader] = useState(false);


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

      let translateY = animatedValue.interpolate({
        inputRange: [0, 310],
        outputRange: [0, -310],
        extrapolate: 'clamp',
    });
    

    return (
        <View style={{flex: 1}}>
            <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
            <JobDetailsHeader name={'Jobs Details'} navigation={navigation}/>
            {isLoading ?
                (<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size={50} color="#0000ff" style={{height:80}}/>
                </View>)
                :
                    (
                        <View style={{flex:1}}>
                            {
                                singleJob?.job_summery && 
                                <View>
                                     <View style={{
                                        backgroundColor: Colors.blue,
                                        paddingHorizontal:16,
                                        paddingBottom:12,
                                         
                                        }}>
                                        <Text style={{color:'white',fontFamily:"Montserrat_600SemiBold",marginVertical:8,fontSize:15}}>{singleJob?.title}</Text>
                                        <JobDetailsInfo icon={"users"} title={"Experience:"}
                                                            text={singleJob?.job_summery?.experience}
                                                            IconLib={Feather}/>
                                        <JobDetailsInfo icon={"currency-usd-circle-outline"} title={"Salary:"}
                                                    text={singleJob?.job_summery?.salary_range}
                                                    IconLib={MaterialCommunityIcons}/>
                                    </View>
                        
                                   <Animated.View style={[styles.headerWrapper, {transform: [{translateY}]}]}>
                                    {<View style={{backgroundColor: Colors.blue, paddingHorizontal:16, paddingBottom:12,}}>
                                         <Text style={{color:'white',fontFamily:"Montserrat_600SemiBold",marginVertical:8,fontSize:15}}>{singleJob?.title}</Text>
                                    
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
                                        <JobDetailsInfo icon={"currency-usd-circle-outline"} title={"Salary:"}
                                                    text={singleJob?.job_summery?.salary_range}
                                                    IconLib={MaterialCommunityIcons}/>
                                        <JobDetailsInfo icon={"location-pin"} title={"Location:"}
                                                text={"Ring Road, Mohammadpur, House 18/5, Floor 2nd, Dhaka, 1207"}
                                                IconLib={SimpleLineIcons}/>

                                    </View>
                                    }
                                   
                                    
                                    </Animated.View>
                                </View>
                            }
                        {
                            <AnimatedFlatList
                                showsVerticalScrollIndicator={false}
                                scrollEventThrottle={16}
                                data={[{}]}
                                keyExtractor={() => null}
                                onScroll={Animated.event(
                                    [{nativeEvent: {contentOffset: {y: animatedValue}}}],
                                    { 
                                        useNativeDriver: true,
                                        listener: (event) => {
                                             const offsetY = event.nativeEvent.contentOffset.y;
                                            if(offsetY >= 280){
                                                console.log(offsetY,'offsety...')
                                                // setHeader(true);
                                                
                                            }else{
                                               // setHeader(false);
                                               
                                                console.log(offsetY,'less than 135 offsety...')
                                              
                                                
                                            }
                                             
                                            // do something special
                                        },
                                    },
                                   
                                )}
                                renderItem={() => <>{singleJob?.job_contexts &&
                                        <View marginB-60 marginT-150>
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

                                        </View>}</>}
                            />
                            
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
        </View>
    );
};

export default JobDetails;

const styles = StyleSheet.create({
    applyBtnStyle:{
        marginTop:40,
        position: 'absolute',
        alignSelf:'center',
        width: screenWidth - 32,
        top: '87.5%',
        backgroundColor:'white',
        borderTopEndRadius:16,
        borderTopLeftRadius: 16,
    },
    headerWrapper: {
        backgroundColor: Colors.blue,
		position: 'absolute',
		height: 240,
		left: 0,
		right: 0,
        zIndex:1,
	},

    headerTitleText:{
        fontSize: 15, 
        color:'white',
        marginVertical:8,
        fontWeight:'bold',
        fontFamily:'Montserrat_600SemiBold',
    }
    
})