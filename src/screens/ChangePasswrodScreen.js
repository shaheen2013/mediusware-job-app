import React, {useContext, useState,useEffect} from 'react';
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
import * as Yup from "yup";
import {useFormik} from "formik";
import Toast from "react-native-toast-message";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import ErrorToast from "../components/ErrorToast";
import SuccessToast from "../components/SuccessToast";
import ChangePasswordHeader from "../components/ChangePasswordHeader";

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(6, 'Must be at least 6 character Long!')
        .required('Required'),
    newPassword: Yup.string()
        .min(6, 'Must be at least 6 character Long!')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must be matched').required('Required'),
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

const ChangePasswordScreen = ({navigation, route}) => {
    const {state,tryLocalLogin} = useContext(AuthContext);
    const isIcon = false;
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState("");
    const[isSuccess,setISSuccess ] = useState(false);
    const[loading,setLoading] = useState(false);
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: changePasswordSchema,
        initialValues: { currentPassword: '', newPassword:'',confirmPassword: ''},
        onSubmit: async (values) =>{
            setLoading(true);
            try {
                const response = await mediusware.post('/change-password/',
                    {current_password:values.currentPassword,new_password:values.newPassword,retype_new_password:values.confirmPassword},
                    {
                        headers: {
                            Authorization: `Bearer ${state.token}`
                        }
                    });
                console.log("success: ",response.data);
                setLoading(false);
                setErrorMsg("");
                setISSuccess(true);
                //setSuccess(response.data.message);

            }catch(err){
                console.log(err.response.data);
                setISSuccess(false);
                setLoading(false);
                let currentPasswordError = (err.response.data?.current_password !== undefined);
                if(currentPasswordError){
                    setError("password");
                    setErrorMsg("Current Password Does not Matched");
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
        successShow();
        setISSuccess(false);
    }, [isSuccess])

    const successShow = () => {
        isSuccess && Toast.show({
            type: 'successToast',
            text1: ` Changed Password Successfully`
        })
    }


    return (<SafeAreaView style={{flex:1}}>
        <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
        <ChangePasswordHeader name={'Change Password'} navigation={navigation}/>
        <View paddingH-16 marginT-20 flex-1>
            <ScrollView showsVerticalScrollIndicator={false}>
                <InputField
                    isIcon={true}
                    title={'Current Password'}
                    value={values.currentPassword}
                    onChangeText={handleChange('currentPassword')}
                    onBlur={handleBlur('currentPassword')}
                    error={errors.currentPassword}
                    touched={touched.currentPassword}
                    autoCapitalize={"none"}
                />

                <InputField
                    isIcon={true}
                    title={'New Password'}
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    error={errors.newPassword}
                    touched={touched.newPassword}
                    autoCapitalize={"none"}
                />

                <InputField
                    isIcon={true}
                    title={'Confirm Password'}
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    autoCapitalize={"none"}
                />
            </ScrollView>
            <View marginV-30>
                <TouchableOpacity onPress={handleSubmit} disabled={loading}>
                    <FilledBtn title={'Save'} isLoading={loading}/>
                </TouchableOpacity>
            </View>
            <Toast
                config={toastConfig}
                visibilityTime={3000}
                position='top'
            />
        </View>
    </SafeAreaView>);
};


export default ChangePasswordScreen;