import React from 'react';
import {Text, Colors, TouchableOpacity, View} from "react-native-ui-lib";

const BlueOutlineBtn = () => {
    return (<View
        style={{
            backgroundColor: Colors.white,
            height: 50,
            width: '100%',
            borderRadius: 10,
            borderColor: Colors.blue,
            borderWidth: 1
        }}
        paddingV-14>
        <Text btn_text blue center>Back</Text>
    </View>);
};

export default BlueOutlineBtn;