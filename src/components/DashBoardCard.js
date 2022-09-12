import React from 'react';
import {ImageBackground} from 'react-native';
import {Colors, Text, View, TouchableOpacity} from 'react-native-ui-lib';

const DashBoardCard = ({singleApply,navigation}) => {
  //  onPress={() => navigation.navigate('ExamProgress',{id:singleApply?.unique_id})}
    return (
        <View
            marginV-8
            style={{
                borderWidth: 1,
                borderColor: Colors.borderColor,
                borderRadius: 16,
                overflow: 'hidden'
            }}>
            
            <TouchableOpacity onPress={() => navigation.navigate('ExamProgress',{id:singleApply?.unique_id})}>
                <ImageBackground source={require('../../assets/images/bgJobCard.jpg')} style={{
                    padding: 16,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                }}>
                    <View row style={{justifyContent: 'space-between'}}>
                        <Text gray caption>You have applied for the job</Text>
                        <Text gray text>{singleApply?.created_at}</Text>
                    </View>

                    <Text subtitle3 gray marginV-8>{singleApply?.job?.title.toUpperCase()}</Text>
                    <Text subtitle3 gray>Exp.Salary: <Text blue> {singleApply?.expected_salary}</Text></Text>
                </ImageBackground>
            </TouchableOpacity>

        </View>
    );
};

export default DashBoardCard;