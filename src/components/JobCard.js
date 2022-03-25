import React from 'react';
import {ImageBackground} from 'react-native';
import {Colors, Text, View, TouchableOpacity} from 'react-native-ui-lib';

const JobCard = ({job,navigation}) => {
    return (
        <View
            marginV-8
            style={{
                borderWidth: 1,
                borderColor: Colors.borderColor,
                borderRadius: 16,
                overflow: 'hidden'
            }}>
            <TouchableOpacity onPress={()=>navigation.navigate('StackNavigation', { screen: 'JobDetails' })}>
                <ImageBackground source={require('../../assets/images/bgJobCard.jpg')} style={{
                    padding: 16,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                }}>
                    <Text blue text marginB-7>{job.title}</Text>
                    <Text caption gray marginB-7>Salary: {job.salary}</Text>
                    <Text caption gray marginB-7>Experience: {job.experience}</Text>
                </ImageBackground>
            </TouchableOpacity>

        </View>
    );
};

export default JobCard;