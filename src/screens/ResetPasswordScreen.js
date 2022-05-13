import React, {useState,useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import LoginImg from "../../assets/svgIcon/LoginImg";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import OutlineBtn from "../components/buttons/OutlineBtn";
import FilledBtn from "../components/buttons/FilledBtn";
import {Context as AuthContext} from "../contexts/AuthContext";
import mediusware from "../api/mediusware";
import ErrorMsg from "../components/ErrorMsg";
import {ScrollView} from "react-native";
import SuccessMsg from "../components/SuccessMsg";

const ResetPasswordScreen = ({navigation, route}) => {
    const {state,tryLocalLogin} = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [otp,setOtp] = useState('');
    const [password,setPassword] = useState('');
    const[rePassword,setRePassword] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState("");
    const[success,setSuccess ] = useState("");
    const[isSuccess,setISSuccess ] = useState(false);
    const isIcon = false;

    const validateEmail = (email) => {
        return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);
    };

    const resetPassword = async () => {
        if (email === "") {
            setError("email");
            setErrorMsg("Please, Enter your Email Address");
            return;
        }
        if (!validateEmail(email)) {
            setError("email");
            setErrorMsg("Please, Enter Valid Email Address!!!");
            return;
        }
        if (otp === "") {
            setError("otp");
            setErrorMsg("Please, Enter your OTP");
            return;
        }
        if (password === "") {
            setError("password");
            setErrorMsg("Please, Enter your Password");
            return;
        }

        if (password.length < 6) {
            setError("password");
            setErrorMsg("Password Should be more than 6 character long");
            return;
        }
        if (password !== rePassword) {
            setError("re_password");
            setErrorMsg("Passwords are not matched!!!");
            return;
        }

        try {
            const response = await mediusware.post('/reset-password/', {email,otp,password},{
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            });
            setErrorMsg("");
            setISSuccess(true);
            setSuccess(response.data.message);
            setEmail('');
            setPassword('');
            setRePassword('');
            setOtp('');
        }catch(err){
            setISSuccess(false);
            let emailError = (err.response.data?.email !== undefined);
            let otpError = (err.response.data?.otp !== undefined);
            if(emailError){
                setError("email");
                setErrorMsg("Your given email is not found in candidate list, please insert a valid email address!!!");
            }
            if(otpError){
                setError("otp");
                setErrorMsg("OTP is not correct or expire!!!");
            }

        }
    }
    return(
    <SafeAreaView style={{flex:1}}>
        <CommonHeader name={'Reset Password'} navigation={navigation}/>
        <View paddingH-16 marginT-20 style={{flex:1}}>
            <View style={{flex:5}}>
                <LoginImg/>
                <Text h5 deepGray marginT-20>Reset Your Password</Text>
                <Text text gray marginB-20 marginT-8>We've send you an email with OTP code,
                    please fill the form bellow and hit enter to reset your password</Text>
                    {isSuccess && <SuccessMsg msg={success}/>}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <InputField title={'Email Address'} placeholderText={'email@email.com'} value={email} onChangeText={setEmail}/>
                    {error === "email" && <ErrorMsg msg={errorMsg} />}
                    <InputField title={'OTP'} placeholderText={'OTP Code'} value={otp} onChangeText={setOtp}/>
                    {error === "otp" && <ErrorMsg msg={errorMsg} />}
                    <InputField isIcon={true} title={'Password'} placeholderText={'New Password'} value={password} onChangeText={setPassword}/>
                    {error === "password" && <ErrorMsg msg={errorMsg} />}
                    <InputField isIcon={true} title={'Re-Type Password'} placeholderText={'Re-Type New Password'} value={rePassword} onChangeText={setRePassword}/>
                    {error === "re_password" && <ErrorMsg msg={errorMsg} />}
                </ScrollView>
            </View>

            <View style={{flex:1}}>
                <View row marginT-40>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} flex-1 marginR-10>
                        <OutlineBtn title={'Login'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={resetPassword} flex-3>
                        <FilledBtn title={'Reset Password'}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    </SafeAreaView>);
};


export default ResetPasswordScreen;
