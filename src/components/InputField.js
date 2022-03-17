import React from 'react';

import {Text, View,TextInput,TouchableOpacity} from 'react-native';
//import {TextField} from 'react-native-ui-lib';
import {StyleSheet} from "react-native";

const InputField = ({title,placeholderText}) => {
    return (
        <View>
            <Text style={styles.contentTextStyle}>{title}</Text>
            <TextInput style={styles.textInputStyle}  placeholder={placeholderText}>
            </TextInput>

        </View>

    );
};


export default InputField;
const styles = StyleSheet.create({

    contentTextStyle: {
        fontSize: 14,
        color: '#4D4D4D',
        marginBottom:8,
    },
    textInputStyle: {
        fontSize: 14,
        borderColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 15,
    }
})