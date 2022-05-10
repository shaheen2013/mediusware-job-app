import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import LoginImg from "../../assets/svgIcon/LoginImg";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar,ScrollView} from "react-native";
import {Context as AuthContext} from "../contexts/AuthContext";
import {useIsFocused} from "@react-navigation/native";
import {Screen} from "react-native-screens";
function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const LoginScreen = ({navigation, route}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {state,register,login} = useContext(AuthContext);
    const isIcon = false;

    const userLogin = () =>{
        login({email,password});
        console.log(state);
        navigation.navigate('BottomNavigation',{screen:'Home'});
        setEmail('');
        setPassword('');
    }
    return (
        <SafeAreaView style={{flex:1}}>
        <CommonHeader name={route.name} navigation={navigation}/>
        <FocusAwareStatusBar barStyle='dark-content' backgroundColor={Colors.white}/>
        {/*<StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>*/}
        <View paddingH-16 marginT-20 flex-1>
            <View flex-3>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <LoginImg/>
                    <Text h5 deepGray marginT-20>Hello,{'\n'}
                        Good to see you again!</Text>
                    <Text text gray marginB-20 marginT-8>Log in to get going with our recruitment
                        process!</Text>

                    <InputField title={'Email Address'} placeholderText={'email@email.com'} value={email} onChangeText={setEmail}/>
                    <InputField isIcon={true} title={'Password'} placeholderText={'Input Password'} value={password} onChangeText={setPassword}/>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text blue text style={{alignSelf: 'flex-end'}}>Forgot Password?</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>


            <View flex-2>
                <Text text gray marginT-40>If don't apply any mediusware job,then apply one <Text
                    onPress={() => navigation.navigate('BottomNavigation',{screen:'Home'})} blue>Job</Text></Text>
                <TouchableOpacity marginV-20 onPress={userLogin}>
                    <FilledBtn title={'Login'}/>
                </TouchableOpacity>
            </View>

        </View>
    </SafeAreaView>
    );
};


export default LoginScreen;
