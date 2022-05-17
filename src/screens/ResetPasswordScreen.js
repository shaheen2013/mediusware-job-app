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
import * as Yup from "yup";
import {useFormik} from "formik";

const resetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    otp: Yup.number().required('Required'),
    password: Yup.string()
        .min(6, 'Must be 6 character Long!')
        .required('Required'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must be matched').required('Required'),
});

const ResetPasswordScreen = ({navigation, route}) => {
    const {state,tryLocalLogin} = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState("");
    const[success,setSuccess ] = useState("");
    const[isSuccess,setISSuccess ] = useState(false);
    const isIcon = false;

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: resetPasswordSchema,
        initialValues: { email: '', otp:'',password: '',rePassword:''},
        onSubmit: async (values) =>{
            try {
                const response = await mediusware.post('/reset-password/', {email:values.email,otp:values.otp,password:values.password},{
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    }
                });
                setErrorMsg("");
                setISSuccess(true);
                setSuccess(response.data.message);

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
    });


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
                    <InputField
                        autoCapitalize={'none'}
                        autoCompleteType={'email'}
                        keyboardType={'email-address'}
                        title={'Email Address'}
                        placeholderText={'email@email.com'}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={errors.email}
                        touched={touched.email}
                    />
                    <InputField
                        title={'OTP'}
                        placeholderText={'OTP Code'}
                        value={values.otp}
                        autoCapitalize={'none'}
                        autoCompleteType={'email'}
                        keyboardType={'numeric'}
                        value={values.otp}
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        error={errors.otp}
                        touched={touched.otp}
                    />
                    <InputField
                        isIcon={true}
                        title={'Password'}
                        placeholderText={'New Password'}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={errors.password}
                        touched={touched.password}
                        autoCapitalize={"none"}

                    />
                    <InputField
                        isIcon={true}
                        title={'Re-Type Password'}
                        placeholderText={'Re-Type New Password'}
                        value={values.rePassword}
                        onChangeText={handleChange('rePassword')}
                        onBlur={handleBlur('rePassword')}
                        error={errors.rePassword}
                        touched={touched.rePassword}
                        autoCapitalize={"none"}

                    />

                </ScrollView>
            </View>

            <View style={{flex:1}}>
                <View row marginT-40>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} flex-1 marginR-10>
                        <OutlineBtn title={'Login'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit} flex-3>
                        <FilledBtn title={'Reset Password'}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    </SafeAreaView>);
};


export default ResetPasswordScreen;
