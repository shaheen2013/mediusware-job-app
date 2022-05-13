import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text,TouchableOpacity,Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import PasswordImg from "../../assets/svgIcon/PasswordImg";
import FilledBtn from "../components/buttons/FilledBtn";
import OutlineBtn from "../components/buttons/OutlineBtn";
import {StatusBar} from "react-native";
import {Context as AuthContext} from "../contexts/AuthContext";
import mediusware from "../api/mediusware";
import ErrorMsg from "../components/ErrorMsg";

const ForgotPasswordScreen = ({navigation,route}) => {
    const{state,tryLocalLogin} = useContext(AuthContext);
    const [email,setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);
    };

        const SendOTP = async () => {
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
            try {
                const response = await mediusware.post('/send-otp/', {email},{
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    }
                });
                setErrorMsg("");
                setEmail('');
                navigation.navigate('ResetPassword');
            }catch(err){
                let emailError = (err.response.data?.email !== undefined);
                setError("email");
                emailError && setErrorMsg("Your given email is not found in candidate list, please insert a valid email address!!!");
            }
        }

    return (
        <SafeAreaView>
            <CommonHeader name={'Forgot Password'} navigation={navigation}/>
            <View paddingH-16 marginT-20>
                <PasswordImg/>
                <Text h5 deepGray marginT-20>Forgot password?</Text>
                <Text text gray marginB-20 marginT-8>Log in to get going with our recruitment process!</Text>
                <InputField isIcon={false} title={'Email Address'} placeholderText={'email@email.com'} value={email} onChangeText={setEmail}/>
                {error === "email" && <ErrorMsg msg={errorMsg} />}
                <View row marginT-40>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')} flex-1 marginR-10>
                        <OutlineBtn title={'Login'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={SendOTP} flex-3>
                        <FilledBtn title={'Forgot Password'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
