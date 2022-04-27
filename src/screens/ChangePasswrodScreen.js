import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import LoginImg from "../../assets/svgIcon/LoginImg";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import OutlineBtn from "../components/buttons/OutlineBtn";
import FilledBtn from "../components/buttons/FilledBtn";
import JobDetailsHeader from "../components/JobDetailsComponents/JobDetailsHeader";
import {useIsFocused} from "@react-navigation/native";
import {StatusBar,ScrollView} from "react-native";
import mediusware from "../api/mediusware";
import {Context as AuthContext} from "../contexts/AuthContext";
import SuccessMsg from "../components/SuccessMsg";
import ErrorMsg from "../components/ErrorMsg";
function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const ChangePasswordScreen = ({navigation, route}) => {
    const {state,tryLocalLogin} = useContext(AuthContext);
    const isIcon = false;
    const [currentPassword,setCurrentPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState("");
    const[success,setSuccess ] = useState("");
    const[isSuccess,setISSuccess ] = useState(false);

    const changePassword = async () => {
        if (currentPassword === "") {
            setError("password");
            setErrorMsg("Please, Enter your Current Password");
            return;
        }
        if (newPassword === "") {
            setError("newPassword");
            setErrorMsg("Please, Enter your New Password");
            return;
        }
        if(confirmPassword === ""){
            setError("confirmPassword");
            setErrorMsg("Please, Confirm your Password");
            return;
        }
        if (confirmPassword.length < 6) {
            setError("confirmPassword");
            setErrorMsg("Password Should be more than 6 character long");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("confirmPassword");
            setErrorMsg("Passwords are not matched!!!");
            return;
        }

        try {
            const response = await mediusware.post('/change-password/',
                {current_password:currentPassword,new_password:newPassword,retype_new_password:confirmPassword},
                {
                        headers: {
                            Authorization: `Bearer ${state.token}`
                        }
            });

            //navigation.navigate('Home');
            setErrorMsg("");
            console.log("reset password:",response.data);
            setISSuccess(true);
            setSuccess("Password Changed Successfully.");
            setCurrentPassword('');
            setConfirmPassword('');
            setNewPassword('');
            setTimeout(
                ()=>{
                    navigation.navigate('Profile')
                },

                1500
            );
            //navigation.navigate('Profile')
           // setSuccess(response.data.message);
        }catch(err){
            console.log(err.response.data);
            setISSuccess(false);
            let currentPasswordError = (err.response.data?.current_password !== undefined);
            if(currentPasswordError){
                setError("password");
                setErrorMsg("Current Password Does not Matched");
            }

        }
    }
    return (<SafeAreaView style={{flex:1}}>
        <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
        <JobDetailsHeader name={'Change Password'} navigation={navigation}/>
        <View paddingH-16 marginT-20 flex-6>
            <ScrollView showsVerticalScrollIndicator={false}>
                <InputField isIcon={true} title={'Current Password'} value={currentPassword} onChangeText={setCurrentPassword}/>
                {error === "password" && <ErrorMsg msg={errorMsg} />}
                <InputField isIcon={true} title={'New Password'} value={newPassword} onChangeText={setNewPassword}/>
                {error === "newPassword" && <ErrorMsg msg={errorMsg} />}
                <InputField isIcon={true} title={'Confirm Password'} value={confirmPassword} onChangeText={setConfirmPassword}/>
                {error === "confirmPassword" && <ErrorMsg msg={errorMsg} />}
                {isSuccess && <SuccessMsg msg={success}/>}
            </ScrollView>

            <View flex-1>
                <TouchableOpacity onPress={changePassword}>
                    <FilledBtn title={'Save'}/>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>);
};


export default ChangePasswordScreen;