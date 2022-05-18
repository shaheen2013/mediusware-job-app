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
import Toast from 'react-native-toast-message';
import {Ionicons} from "@expo/vector-icons";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Required'),
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
                paddingHorizontal:16
            }}>
            <Ionicons name="warning" size={40} color={Colors.warningColor} />
            <Text subtitle1 warningColor>{text1}</Text>
        </View>
    )
};

const ForgotPasswordScreen = ({navigation,route}) => {
    const{state,tryLocalLogin} = useContext(AuthContext);
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState("");
    const [loading,setLoading] = useState(false);

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
            setLoading(true);
            try {
                const response = await mediusware.post('/send-otp/', {email:values.email},{
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    }
                });
                console.log(response.data);
                navigation.navigate('ResetPassword');
                setLoading(false);
                setErrorMsg("");
                values.email('');

            }catch(err){
                console.log(err.response.data);
               let emailError = (err.response.data?.email !== undefined);
                emailError && setErrorMsg("Email address not Found in candidate list.");
                setLoading(false);
            }
        }
    });

    useEffect(() => {
        showToast()
        setErrorMsg( "");
    }, [errorMsg])

    const showToast = () => {
        errorMsg && Toast.show({
            type: 'tomatoToast',
            text1: ` ${errorMsg}`
        })
    }


    return (
        <SafeAreaView>
            <CommonHeader name={'Forgot Password'} navigation={navigation}/>
            <View paddingH-16 marginT-20>
                <PasswordImg/>
                <Text h5 deepGray marginT-20>Forgot password?</Text>
                <Text text gray marginB-20 marginT-8>Log in to get going with our recruitment process!</Text>
                <Toast
                    config={toastConfig}
                    visibilityTime={3000}
                    position='top'
                />
                {/*{error === "email" && <ErrorMsg msg={errorMsg}/>}*/}
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

                <View row marginV-40>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')} flex-1 marginR-10>
                        <OutlineBtn title={'Login'}/>
                    </TouchableOpacity>
                    <TouchableOpacity  disable={loading} onPress={()=>{
                        handleSubmit()
                    }} flex-3>
                        <FilledBtn title={'Forgot Password'} isLoading={loading}/>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordScreen;
