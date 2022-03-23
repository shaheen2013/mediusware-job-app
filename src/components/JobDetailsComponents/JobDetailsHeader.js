import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {TouchableOpacity, View, Text, Colors} from "react-native-ui-lib";
import {StyleSheet} from 'react-native'
import WhiteLeftArrowIcon from "../../../assets/svgIcon/WhiteLeftArrowIcon";


const JobDetailsHeader = ({name, navigation}) => {
    return (
        <View row paddingV-16
              style={{position: 'relative', backgroundColor: Colors.blue}}>
            <View paddingH-16>
                <TouchableOpacity onPress={() => navigation.dispatch(CommonActions.goBack())}>
                    <WhiteLeftArrowIcon/>
                </TouchableOpacity>
            </View>
            <View style={{position: 'absolute', left: '15%', marginTop: 10}}>
                <Text subtitle1 style={{color: Colors.white}}>{name}</Text>
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

export default JobDetailsHeader;
