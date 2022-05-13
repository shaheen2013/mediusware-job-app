import React from 'react';
import {Text, Colors, View} from "react-native-ui-lib";

const FilledBtn = ({title}) => {
    return (
        <View
            style={{
                backgroundColor: Colors.blue,
                height: 50,
                width: '100%',
                borderRadius: 10
            }}
            paddingV-15>
            <Text btn_text white center>{title}</Text>
        </View>);
};

export default FilledBtn;
