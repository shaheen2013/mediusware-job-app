import React from 'react';
import {Text, View, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {ImageBackground} from "react-native";
import ScoreIcon from "../../../assets/svgIcon/ScoreIcon";
import PassScoreIcon from "../../../assets/svgIcon/PassScoreIcon";
import ClockIcon from "../../../assets/svgIcon/ClockIcon";
const ExamCard = ({title,text,score,duration,passScore}) => {
    return (
        <View
            marginT-10
            style={{
                borderWidth: 1,
                borderColor: Colors.borderColor,
                borderRadius: 16,
                overflow: 'hidden'
            }}>
            <TouchableOpacity >
                <ImageBackground source={require('../../../assets/images/bgJobCard.jpg')} style={{
                    padding: 16,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                }}>

                    <View row>
                        <View row flex-2 style={{alignItems:'center'}}>
                            <ScoreIcon/>
                            <Text subtitle1 deepGray marginL-5>Score:</Text>
                        </View>
                        <Text subtitle1 blue flex-3>{score}</Text>
                    </View>
                    <View row marginT-10>
                        <View row flex-2 style={{alignItems:'center'}}>
                            <ClockIcon/>
                            <Text subtitle1 deepGray marginL-5>Duration:</Text>
                        </View>
                        <Text subtitle1 blue flex-3>{duration} Minute</Text>
                    </View>
                    <View row marginT-10>
                        <View row flex-2 style={{alignItems:'center'}}>
                            <PassScoreIcon/>
                            <Text subtitle1 deepGray marginL-5>Pass Score:</Text>
                        </View>
                        <Text subtitle1 blue flex-3>{passScore}</Text>
                    </View>

                </ImageBackground>
            </TouchableOpacity>

        </View>


    );
};

export default ExamCard;