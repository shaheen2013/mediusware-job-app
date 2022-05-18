import React from 'react';
import {Text, Colors, View} from "react-native-ui-lib";
import { ActivityIndicator,StyleSheet} from "react-native";

const FilledBtn = ({title,isLoading}) => {
    return (
        <View
            style={{
                backgroundColor: Colors.blue,
                height: 50,
                width: '100%',
                borderRadius: 10,
                alignItems:'center',
                justifyContent:'center'
            }}
            paddingV-15>
            {isLoading && <ActivityIndicator size={30} color={Colors.borderColor} style={{height: 30}}/>}
            {!isLoading && <Text btn_text white center>{title}</Text>}

        </View>);
};

export default FilledBtn;

