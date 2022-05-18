import React, {useState, useContext, useEffect} from 'react';
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
import Toast from 'react-native-toast-message';
import {Ionicons,AntDesign} from "@expo/vector-icons";


const resetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    otp: Yup.string().min(6, 'OTP must be at least 6 digits Long!').required('Required'),
    password: Yup.string()
        .min(6, 'Must be at least 6 character Long!')
        .required('Required'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must be matched').required('Required'),
});

const toastConfig = {
    tomatoToast: ({ text1, props }) => (
        <View
            style={{ height: 80,
                backgroundColor: Colors.borderColor,
                borderRadius:10,
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                opacity:1,
                borderLeftWidth:5,
                borderLeftColor:Colors.warningColor,
                marginHorizontal:16,
                paddingHorizontal:16,

            }}>
            <Ionicons name="warning" size={40} color={Colors.warningColor} />
            <Text subtitle1 warningColor>{text1}</Text>
        </View>
    ),
    successToast: ({ text1, props }) => (
        <View
            style={{ height: 80,
                backgroundColor: Colors.borderColor,
                borderRadius:10,
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                opacity:1,
                borderLeftWidth:5,
                borderLeftColor:'green',
                marginHorizontal:16,
                paddingHorizontal:16,
            }}>
            <AntDesign name="checkcircle" size={40} color="green" />
            <Text subtitle1 style={{color:'green'}}>{text1}</Text>
        </View>
    ),


};

const ResetPasswordScreen = ({navigation, route}) => {
    const {state,tryLocalLogin} = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState("");
    const[success,setSuccess ] = useState("");
    const[isSuccess,setISSuccess ] = useState(false);
    const[loading,setLoading] = useState(false);
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
            setLoading(true);
            try {
                const response = await mediusware.post('/reset-password/', {email:values.email,otp:values.otp,password:values.password},{
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    }
                });
                setLoading(false);
                setErrorMsg("");
                setISSuccess(true);
                setSuccess(response.data.message);

            }catch(err){
                console.log(err.response.data);
                setISSuccess(false);
                setLoading(false);
                let emailError = (err.response.data?.email !== undefined);
                let otpError = (err.response.data?.otp !== undefined);
                if(emailError){
                    setError("email");
                    setErrorMsg("Email address not Found!");
                }
                if(otpError){
                    setError("otp");
                    setErrorMsg("OTP is not correct or expire!");
                }

            }
        }
    });

    useEffect(() => {
        showToast();
        setErrorMsg( "");
    }, [errorMsg])

    const showToast = () => {
        errorMsg && Toast.show({
            type: 'tomatoToast',
            text1: ` ${errorMsg}`
        })
    }

    useEffect(() => {
        successShow()
    }, [success])

    const successShow = () => {
        success && Toast.show({
            type: 'successToast',
            text1: ` Reset Password Successfully`
        })
    }

    return(
    <SafeAreaView style={{flex:1}}>
        <CommonHeader name={'Reset Password'} navigation={navigation}/>
        <View paddingH-16 marginT-20 style={{flex:1}}>
            <View style={{flex:14}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <LoginImg/>
                    <Text h5 deepGray marginT-20>Reset Your Password</Text>
                    <Text text gray marginB-20 marginT-8>We've send you an email with OTP code,
                        please fill the form bellow and hit enter to reset your password</Text>
                    <View>

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
                    </View>
                </ScrollView>
                <Toast
                    config={toastConfig}
                    visibilityTime={3000}
                    position='top'

                />
            </View>

            <View style={{flex:1}} marginV-40>

                <View row>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} flex-1 marginR-10>
                        <OutlineBtn title={'Login'}/>
                    </TouchableOpacity>
                    <TouchableOpacity disable={loading} onPress={handleSubmit} flex-3>
                        <FilledBtn title={'Reset Password'} isLoading={loading}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    </SafeAreaView>);
};


export default ResetPasswordScreen;
