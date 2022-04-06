import React from 'react';
import {Text, Colors, TouchableOpacity, View} from "react-native-ui-lib";
import { Ionicons } from '@expo/vector-icons';

const AlertOutlineBtn = ({title}) => {
    return (<View
        style={{
            backgroundColor: Colors.white,
            height: 50,
            width: '100%',
            borderRadius: 10,
            borderColor: Colors.borderColor,
            borderWidth: 1,
            justifyContent:'center',
            alignItems:'center',
        }} row
        paddingV-14 marginT-16>
        <Ionicons name="alert-circle-outline" size={21} color={Colors.blue}/>
        <Text btn_text gray center marginL-12>{title}</Text>
    </View>);
};

export default AlertOutlineBtn;