import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {TouchableOpacity, View, Text, Colors} from "react-native-ui-lib";
import {StyleSheet} from 'react-native';
import WhiteLeftArrowIcon from "../../assets/svgIcon/WhiteLeftArrowIcon";
import { Feather } from '@expo/vector-icons';



const ProfileHeader = ({name, navigation}) => {
    return (
        <View row paddingV-20
              style={{position: 'relative', backgroundColor: Colors.blue}}>
            <TouchableOpacity onPress={() => navigation.dispatch(CommonActions.goBack())}>
                <View paddingH-16>
                    <WhiteLeftArrowIcon/>
                </View>
            </TouchableOpacity>
            <View style={{position: 'absolute', left: '15%', marginTop: 13}}>
                <Text subtitle1 style={{color: Colors.white}}>{name}</Text>
            </View>
            <View style={{position: 'absolute', right: '8%', marginTop: 11}}>
                <TouchableOpacity>
                    <Feather name="settings" size={24} color="white"/>
                </TouchableOpacity>

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    headerStyle: {
        position: 'relative',
        borderBottomWidth: 1,
        borderColor: 'box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);'
    },
    blueHeaderStyle: {
        position: 'relative',
        backgroundColor: Colors.blue,
    }
})

export default ProfileHeader;
