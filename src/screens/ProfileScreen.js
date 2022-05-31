import React, {useEffect, useState,useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors, Image} from 'react-native-ui-lib';
import {StatusBar, ScrollView, StyleSheet,Linking,Button} from "react-native";
import FilledBtn from "../components/buttons/FilledBtn";
import {useIsFocused} from "@react-navigation/native";
import ProfileHeader from "../components/ProfileHeader";
import {AntDesign, Feather, Ionicons} from '@expo/vector-icons';
import InputField from "../components/formComponents/InputField";
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import OutlineBtn from "../components/buttons/OutlineBtn";
import { EvilIcons } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";
import {Context as AuthContext} from "../contexts/AuthContext";
import {Context as UserContext} from "../contexts/UserContext";
import * as Yup from "yup";
import {useFormik} from "formik";
import Toast from "react-native-toast-message";

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

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

const profileSchema = Yup.object().shape({
    full_name:Yup.string().required('Required'),
    password: Yup.string()
        .min(6, 'Must be 6 character Long!')
        .required('Required')
});

const ProfileScreen = ({navigation, route}) => {
    const {state:{token},tryLocalLogin,logout,login} = useContext(AuthContext);
    const {state:{user,loader,errorMessage,success},updateUser,clearErrorMsg,getUser,clearSuccess} = useContext(UserContext);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [cv, setCv] = useState({});
    const[isSuccess,setISSuccess ] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);
    let formDataObj = new FormData();
    const [file , setFile] = useState(null)
    const [image , setImage] = useState(null)
    const[loading,setLoading] = useState(false);

    const{
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: profileSchema,
        initialValues: {full_name: user?.user?.full_name, email: user?.user?.email, password: '',cv:user?.user?.cv,avatar:user?.user?.avatar},
        enableReinitialize: true,
        onSubmit: async (values) =>{
            if(file !== null){
                formDataObj.append('cv',file);
            }

            if(image !== null){
                formDataObj.append('avatar',image);
            }
            let formData = {
                full_name:values.full_name,
                email:values?.email,
                current_password:values.password,
            };
            //console.log(formDataObj , 'formDataObj')
            for (let key in formData) {
                formDataObj.append(
                    key,
                    Array.isArray(formData[key])
                        ? JSON.stringify(formData[key])
                        : formData[key]
                );
            }
            updateUser(formDataObj,token, () => {
                clearErrorMsg();
                values.password = '';
                setCv({});
            });
        }
    });

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        setSelectedImage({ localUri: pickerResult.uri });
        const uri = pickerResult.uri;
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        console.log(formDataObj , 'formDataObj image')
        setImage({
            uri,
            name: `avatar.${fileType}`,
            type: `image/${fileType}`,
        })
        console.log(formDataObj);

    };

    // Document Picker Expo
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({type: "application/*" });
        console.log(formDataObj , 'pickDocument image')
        if (result.type !== "cancel") {
            const { name, uri } = result;
            const uriParts = name.split(".");
            const fileType = uriParts[uriParts.length - 1];
            setFile({
                uri,
                name,
                type: `application/${fileType}`,
            })
            setCv(result);
        }
        console.log(formDataObj);
    };

    useEffect(()=>{
        tryLocalLogin().then(()=>getUser(token));
    },[token])


    useEffect(() => {
        showToast();
        clearErrorMsg();
    }, [errorMessage?.error])

    const showToast = () => {
        errorMessage?.error && Toast.show({
            type: 'tomatoToast',
            text1: ` ${errorMessage?.error}`
        })
    }

    useEffect(() => {
        successShow();
        clearSuccess();
    }, [success])

    const successShow = () => {
        success && Toast.show({
            type: 'successToast',
            text1: ` Updated Profile Successfully`
        })
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
            {/*Modal for setting */}
            <View style={{position: 'absolute'}}>
                <Modal isVisible={modalVisible}>
                    <View style={styles.modalView}>
                        <View style={styles.modalElementContainer}>
                            <View marginB-40 row style={{justifyContent: 'space-between'}}>
                                <Text blackGray subtitle4>Setting</Text>
                                <TouchableOpacity onPress={()=>setModalVisible(false)}>
                                    <EvilIcons name="close" size={30} color={Colors.gray} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={{marginVertical:8}} onPress={()=> {
                                navigation.navigate('ChangePassword')
                                setModalVisible(false)
                            }}>
                                <OutlineBtn title={"Change Password"}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginVertical:8}} onPress={logout}>
                                <FilledBtn title={"Logout"}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

            <View flex-1>
                <ProfileHeader name={'Profile'} navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible}/>

                <View  style={{flex: 6}}>
                    <View style={{position:'relative'}}>
                        <View>
                            <View style={{height:50}} backgroundColor={Colors.blue}/>
                            <View style={{height:50}} backgroundColor={Colors.white}/>
                        </View>
                        <View style={{position:'absolute',alignSelf:'center',marginTop:10}}>
                            {selectedImage !== null ?<Image source={{ uri: selectedImage.localUri}} style={{height:80,width:80,borderRadius:10}}/>:
                                (user?.user?.avatar !== null ? <Image source={{ uri: user?.user?.avatar}} style={{height:80,width:80,borderRadius:10}}/>:
                                <Image source={require("../../assets/images/profile.png")}/>)}
                        </View>
                        <View  style={{position:'absolute',marginTop:'15%',marginLeft:'52%'}}>
                            <TouchableOpacity onPress={openImagePickerAsync}>
                                <View backgroundColor={Colors.white} paddingV-5 paddingL-6 style={{borderRadius:15,elevation: 2,width:40}}>
                                    <Feather name="camera" size={26} color="#4D4D4D" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{paddingHorizontal: 16}}>
                        <InputField
                            title={'Name*'}
                            autoCapitalize={"words"}
                            keyboardType={'email-address'}
                            autoComplete={"off"}
                            autoCorrect={false}
                            spellCheck={false}
                            value={values.full_name}
                            onChangeText={handleChange('full_name')}
                            onBlur={handleBlur('full_name')}
                            error={errors.full_name}
                            touched={touched.full_name}
                        />

                        <InputField
                            title={'Email*'}
                            keyboardType={'email-address'}
                            value={values.email}
                            editable={false}
                        />
                        <View>
                            <Text marginB-8 text>CV/Resume*</Text>
                            <View style={styles.uploadContainer}>
                                <View style={styles.uploadStyle}>
                                    <TouchableOpacity paddingH-8 paddingV-3 onPress={pickDocument}>
                                        <Text blue subtitle3>
                                            Choose File
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.fileNameStyle} paddingH-10 paddingV-4>
                                    <Text>{cv?.name}</Text>
                                </View>
                            </View>
                            <Text marginB-16 small_text blue onPress={()=>Linking.openURL(`${user?.user?.cv}`)}>Current CV/Resume*</Text>
                        </View>
                        <InputField
                            isIcon={true}
                            title={'Current Password'}
                            placeholderText={''}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={errors.password}
                            touched={touched.password}
                            autoCapitalize={"none"}
                        />

                    </ScrollView>
                </View>
                <View flex-1 paddingH-16 >
                    <TouchableOpacity disabled={loader} onPress={handleSubmit}>
                        <FilledBtn title={'Save'} isLoading={loader}/>
                    </TouchableOpacity>
                </View>
                <Toast
                    config={toastConfig}
                    visibilityTime={3000}
                    position='top'
                />
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    uploadContainer: {
        borderColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    uploadStyle: {
        borderColor: "#E9E9E9",
        height: 32,
        borderWidth: 1,
        marginVertical: 8,
        borderRadius: 10,
        alignSelf:'flex-start',
    },
    modalView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 1,
    },
    modalElementContainer:{
        height:220,
        backgroundColor:Colors.white,
        borderRadius:20,
        padding:16,
    },
    fileNameStyle: {
        position: "absolute",
        marginLeft: "40%",
    },

})