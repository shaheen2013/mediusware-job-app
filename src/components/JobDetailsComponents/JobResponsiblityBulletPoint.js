import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import CheckIcon from '../../../assets/svgIcon/CheckIcon';

const JobResponsibilityBulletPoint = ({item}) => {
    return (
        <View row>
            <View marginR-8>
                <CheckIcon/>
            </View>
            <View marginB-10 paddingR-8>
                <Text caption gray>{item}</Text>
            </View>
        </View>
    );
};

export default JobResponsibilityBulletPoint;
