import React from 'react';
import {Text, Colors, View} from "react-native-ui-lib";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";

const SuccessToast = ({text1}) => {
    return (
        <View style={styles.successContainer}>
            <AntDesign name="checkcircle" size={40} color="green" />
            <Text subtitle1 style={{color:'green'}}>{text1}</Text>
        </View>
    );
};

export default SuccessToast;

const styles = StyleSheet.create({
    successContainer:{
        height: 80,
        backgroundColor: Colors.borderColor,
        borderRadius:10,
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        opacity:1,
        borderLeftWidth:5,
        borderLeftColor:'green',
        marginHorizontal:16,
        paddingHorizontal:16,
    }
})