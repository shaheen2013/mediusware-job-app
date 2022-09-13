import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from "@react-navigation/native";
import { useFormik } from 'formik';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import * as Yup from 'yup';
import LoginImg from "../../assets/svgIcon/LoginImg";
import FilledBtn from "../components/buttons/FilledBtn";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import { Context as AuthContext } from "../contexts/AuthContext";
const toastConfig = {
    tomatoToast: ({ text1, props }) => (
        <View
            style={{ height: 50,
                width: '100%',
                backgroundColor: Colors.borderColor,
                borderRadius:10,flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                opacity:1,
                borderLeftWidth:5,
                borderLeftColor:Colors.warningColor,
        }}>
            <Ionicons name="warning" size={24} color={Colors.warningColor} />
            <Text subtitle1 warningColor>{text1}</Text>
        </View>
    )
};

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Required'),
    password: Yup.string()
        .min(6, 'Password Should be at lease 6 character Long!')
        .required('Required')
});

const LoginScreen = ({navigation, route}) => {
    const password = useRef(null);
    const {state:{token,errorMessage,loader},register,login,clearErrorMsg} = useContext(AuthContext);
    const [error,setError] = useState('');
    const isIcon = false;
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: LoginSchema,
        initialValues: { email: '', password: '' },
        onSubmit:  (values) =>{

             login({email:values.email,password:values.password},()=>{
                    clearErrorMsg();
                    navigation.navigate('BottomNavigation',{screen:'Home'});
                    values.email = '';
                    values.password = '';

            });
        }
    });

    useEffect(() => {
        showToast()
        clearErrorMsg();
    }, [errorMessage?.error,token])

    const showToast = () => {
        errorMessage?.error && Toast.show({
            type: 'tomatoToast',
            text1: ` ${errorMessage?.error}`
        })
    }

    return (
        <SafeAreaView style={{flex:1}}>
        <CommonHeader name={route.name} navigation={navigation}/>
        <FocusAwareStatusBar barStyle='dark-content' backgroundColor={Colors.white}/>
        <View paddingH-16 marginT-20 flex-1>
            <View flex-6>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <LoginImg/>
                    <Text h5 deepGray marginT-20>Hello,{'\n'}
                        Good to see you again!</Text>
                    <Text text gray marginB-20 marginT-8>Log in to get going with our recruitment
                        process!</Text>

                    {/*<Text text style={{color:'#FF5A5F'}}>{state?.errorMessage?.error}</Text>*/}
                    <InputField
                        autoCompleteType={'email'}
                        autoCapitalize={"none"}
                        keyboardType={'email-address'}
                        title={'Email Address'}
                        placeholderText={'email@email.com'}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={errors.email}
                        touched={touched.email}
                        onSubmitEditing={() => password.current?.focus()}
                    />
                    <InputField
                        ref={password}
                        isIcon={true}
                        title={'Password'}
                        autoCapitalize={"none"}
                        placeholderText={'Input Password'}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={errors.password}
                        touched={touched.password}
                        onSubmitEditing={() => handleSubmit()}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text blue text style={{alignSelf: 'flex-end'}}>Forgot Password?</Text>
                    </TouchableOpacity>

                </ScrollView>
                <Toast
                    config={toastConfig}
                    visibilityTime={3000}
                    position='top'
                />

            </View>

            <View flex-3 marginB-40>
                <TouchableOpacity marginV-20 disabled={loader}  onPress={()=>{
                   handleSubmit()
                }}>
                    <FilledBtn title={'Login'} isLoading={loader}/>
                </TouchableOpacity>

                <Text text gray marginT-16>If don't apply any mediusware job,then apply one <Text
                    onPress={() => navigation.navigate('JobsDetailsStackNavigation',{screen:'Home'})} blue>Job</Text></Text>

            </View>
        </View>
    </SafeAreaView>
    );
};


export default LoginScreen;
