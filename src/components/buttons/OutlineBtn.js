import React from 'react';
import {Text, Colors, TouchableOpacity, View} from "react-native-ui-lib";

const OutlineBtn = ({title}) => {
    return (<View
        style={{
            backgroundColor: Colors.white,
            height: 50,
            width: '100%',
            borderRadius: 10,
            borderColor: Colors.borderColor,
            borderWidth: 1
        }}
        paddingV-14>
        <Text primaryBtnText primaryColor center>{title}</Text>
    </View>);
};

export default OutlineBtn;
