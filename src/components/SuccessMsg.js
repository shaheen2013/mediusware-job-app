import React from 'react';
import {Text, View} from "react-native-ui-lib";

const SuccessMsg = ({msg}) => {
    return (
        <View>
            <Text style={{color:'green'}} text >{msg}</Text>
        </View>);
};

export default SuccessMsg;