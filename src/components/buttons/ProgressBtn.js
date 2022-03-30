import React from 'react';

import {Text, View,StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib'

const ProgressBtn = () => {
    return (
        <View style={styles.buttonStyle}>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonStyle:{
        backgroundColor:Colors.lightGray,
        height: 48,
        width: 48,
        borderRadius: 50,
    }
})
export default ProgressBtn;
