import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text,TouchableOpacity,Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import PasswordImg from "../../assets/svgIcon/PasswordImg";
import PrimaryBtn from "../components/buttons/PrimaryBtn";
import SecondaryBtn from "../components/buttons/SecondaryBtn";

const ForgotPasswordScreen = ({navigation,route}) => {
    return (
        <SafeAreaView>
            <CommonHeader name={'Forgot Password'} navigation={navigation}/>
            <View paddingH-16>
                <PasswordImg/>
                <Text headerText headerTextColor marginT-20>Forgot password?</Text>
                <Text primaryText regularTextColor marginB-20 marginT-8>Log in to get going with our recruitment process!</Text>
                <InputField isIcon={false} title={'Email Address'} placeholderText={'email@email.com'} />

                <View row marginT-40>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')} flex-1 marginR-10>
                        <SecondaryBtn title={'Login'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('ResetPassword')} flex-3>
                        <PrimaryBtn title={'Forgot Password'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
