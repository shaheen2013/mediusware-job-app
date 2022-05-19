import React from 'react';
import {Text, Colors, View} from "react-native-ui-lib";
import {Ionicons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";

const ErrorToast = ({text1}) => {
    return (
        <View style={styles.errorContainer}>
            <Ionicons name="warning" size={40} color={Colors.warningColor} />
            <Text subtitle1 warningColor>{text1}</Text>
        </View>
    );
};

export default ErrorToast;

const styles = StyleSheet.create({
    errorContainer:{
        height: 80,
        backgroundColor: Colors.borderColor,
        borderRadius:10,
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        opacity:1,
        borderLeftWidth:5,
        borderLeftColor:Colors.warningColor,
        marginHorizontal:16,
        paddingHorizontal:16
    }
})