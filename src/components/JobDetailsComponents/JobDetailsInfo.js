import React from 'react';
import {Text, View} from 'react-native-ui-lib';
const JobDetailsInfo = ({icon,title,text,IconLib}) => {
    return (
        <View row style={{alignItems:'center'}} paddingV-5>
            <View marginR-8>
                <IconLib name={icon} size={18} color="white" />
            </View>
            <View paddingR-16>
                <Text caption white>{title} {text}</Text>
            </View>
        </View>
    );
};

export default JobDetailsInfo;
