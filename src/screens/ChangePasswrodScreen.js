import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import LoginImg from "../../assets/svgIcon/LoginImg";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import OutlineBtn from "../components/buttons/OutlineBtn";
import FilledBtn from "../components/buttons/FilledBtn";
import JobDetailsHeader from "../components/JobDetailsComponents/JobDetailsHeader";
import {useIsFocused} from "@react-navigation/native";
import {StatusBar} from "react-native";
function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const ChangePasswordScreen = ({navigation, route}) => {
    const isIcon = false;
    return (<SafeAreaView>
        <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
        <JobDetailsHeader name={'Change Password'} navigation={navigation}/>
        <View paddingH-16 marginT-20>
            <InputField isIcon={true} title={'Current Password'}/>
            <InputField isIcon={true} title={'New Password'}/>
            <InputField isIcon={true} title={'Confirm Password'}/>

            <View marginT-40>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} flex-1 marginR-10>
                    <FilledBtn title={'Save'}/>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>);
};


export default ChangePasswordScreen;