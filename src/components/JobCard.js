import React from 'react';
import {ImageBackground} from 'react-native';
import {Colors, Text, View, TouchableOpacity} from 'react-native-ui-lib';

const JobCard = ({job,navigation,isLoading,setIsLoading}) => {
    const openJobDetails = () =>{
        setIsLoading(true);
        navigation.navigate('JobsDetailsStackNavigation',{ screen: 'JobDetails',params:{slug:job.slug}});

    }
    return (
        <View
            marginV-8
            style={{
                borderWidth: 1,
                borderColor: Colors.borderColor,
                borderRadius: 16,
                overflow: 'hidden'
            }}>
            <TouchableOpacity onPress={openJobDetails}>
                {/*<TouchableOpacity onPress={()=>navigation.navigate('JobsStackNavigation', { screen: 'JobDetails',params:{title:job.title} })}>*/}
                <ImageBackground source={require('../../assets/images/bgJobCard.jpg')} style={{
                    padding: 16,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                }}>
                    <Text blue text marginB-7>{job.title}</Text>
                    <Text caption gray marginB-7>Salary: {job.job_summery.salary_range}</Text>
                    <Text caption gray marginB-7>Experience: {job.job_summery.experience}</Text>
                </ImageBackground>
            </TouchableOpacity>

        </View>
    );
};

export default JobCard;
