import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import DollarIcon from '../../../assets/svgIcon/DollarIcon';
const JobDetailsInfo = ({icon,title,text,IconLib}) => {
    return (
        <View row style={{alignItems:'center'}} paddingV-5>
            <View marginR-8>
               {icon === 'currency-usd'? <DollarIcon/> :<IconLib name={icon} size={18} color="white" />}
            </View>
            <View paddingR-16>
                <Text caption white>{title} {text}</Text>
            </View>
        </View>
    );
};

export default JobDetailsInfo;
