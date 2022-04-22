import React from 'react';
import {Text, Colors, View} from "react-native-ui-lib";

const ErrorMsg = ({msg}) => {
    return (
        <View>
            <Text warningColor text >{msg}</Text>
        </View>);
};

export default ErrorMsg;