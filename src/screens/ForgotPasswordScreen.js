import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text,TouchableOpacity,Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import PasswordImg from "../../assets/svgIcon/PasswordImg";
import FilledBtn from "../components/buttons/FilledBtn";
import OutlineBtn from "../components/buttons/OutlineBtn";
import {Context as AuthContext} from "../contexts/AuthContext";
import mediusware from "../api/mediusware";
import ErrorMsg from "../components/ErrorMsg";
import * as Yup from "yup";
import {useFormik} from "formik";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Required'),
});

const ForgotPasswordScreen = ({navigation,route}) => {
    const{state,tryLocalLogin} = useContext(AuthContext);
    const [email,setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState("");
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: LoginSchema,
        initialValues: { email: ''},
        onSubmit: async (values) =>{
            try {
                const response = await mediusware.post('/send-otp/', {email:values.email},{
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    }
                });
                navigation.navigate('ResetPassword')
                values.email('');
            }catch(err){
                console.log(err.response.data);
               let emailError = (err.response.data?.email !== undefined);
                setError("email");
               emailError && setErrorMsg("Your given email is not found in candidate list, please insert a valid email address!!!");
            }
        }
    });


    return (
        <SafeAreaView>
            <CommonHeader name={'Forgot Password'} navigation={navigation}/>
            <View paddingH-16 marginT-20>
                <PasswordImg/>
                <Text h5 deepGray marginT-20>Forgot password?</Text>
                <Text text gray marginB-20 marginT-8>Log in to get going with our recruitment process!</Text>
                {error === "email" && <ErrorMsg msg={errorMsg}/>}
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

                <View row marginT-40>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')} flex-1 marginR-10>
                        <OutlineBtn title={'Login'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{

                        handleSubmit()
                    }} flex-3>
                        <FilledBtn title={'Forgot Password'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
