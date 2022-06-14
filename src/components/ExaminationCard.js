import React from 'react';
import {ImageBackground} from 'react-native';
import {Colors, Text, View, TouchableOpacity} from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';

const ExaminationCard = ({type,title,examStart,totalScore,score}) => {
    /*const openJobDetails = () =>{
        setIsLoading(true);
        navigation.navigate('JobsDetailsStackNavigation',{ screen: 'JobDetails',params:{slug:job.slug}});

    }*/
    return (
        <View
            marginV-8
            style={{
                borderWidth: 1,
                borderColor: Colors.borderColor,
                borderRadius: 16,
                overflow: 'hidden'
            }}>
                <ImageBackground source={require('../../assets/images/bgJobCard.jpg')} style={{
                    padding: 16,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                }}>

                    <Text deepGray text>{type} {" Exam"}</Text>
                    <Text subtitle3 blackGray marginV-8>{title}</Text>
                    {!examStart && <Text text gray>To Start Viva exam please click on Start Now button</Text>}
                    {examStart ?
                        <Text text blue marginV-8>Result: {`${score} out of ${totalScore}`}</Text>
                        : <View marginV-8 row style={{alignItems:'center'}}>
                            <Text text blue marginR-8>Start Now</Text>
                            <AntDesign name="arrowright" size={18} color={Colors.blue} />
                        </View>
                    }
                </ImageBackground>

        </View>
    );
};

export default ExaminationCard;