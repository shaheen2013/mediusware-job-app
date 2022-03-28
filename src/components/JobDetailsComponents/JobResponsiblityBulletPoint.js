import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {FontAwesome} from '@expo/vector-icons';
import {Colors} from "react-native-ui-lib";

const JobResponsibilityBulletPoint = ({item}) => {
    return (
        <View row>
            <View marginR-8>
                <FontAwesome name="check-circle" size={24} color={Colors.blue}/>
            </View>
            <View marginB-10>
                <Text caption gray>{item}</Text>
            </View>
        </View>
    );
};

export default JobResponsibilityBulletPoint;
