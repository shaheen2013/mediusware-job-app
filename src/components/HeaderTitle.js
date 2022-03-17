import React, { useState } from 'react';
import {Feather} from '@expo/vector-icons';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Typography, Colors, Spacings} from 'react-native-ui-lib';
import Logo from "../../assets/svgIcon/Logo";


const HeaderTitle = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                <View style={styles.iconStyle}>
                    <Feather name="menu" size={24} color="black"/>
                </View>
            </TouchableOpacity>

            <View style={styles.logoStyle}>
                <Logo height="115" width="32"/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        position: "relative"
    },
    iconStyle: {
        backgroundColor: '#F3F7FB',
        padding: 10,
        borderRadius:12,
    },
    logoStyle:{
        position: "absolute",
        left: "35%",
        paddingTop: 10
    }
})

export default HeaderTitle;
