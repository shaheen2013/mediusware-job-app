import React, {useEffect, useState,useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors, Image} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import {StatusBar, ScrollView, StyleSheet,Linking,Button} from "react-native";
import FilledBtn from "../components/buttons/FilledBtn";
import {useIsFocused} from "@react-navigation/native";
import JobDetailsHeader from "../components/JobDetailsComponents/JobDetailsHeader";
import ProfileHeader from "../components/ProfileHeader";
import { Feather } from '@expo/vector-icons';
import InputField from "../components/formComponents/InputField";
import useCandidate from "../hooks/useCandidate";
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import OutlineBtn from "../components/buttons/OutlineBtn";
import { EvilIcons } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";
import mediusware from "../api/mediusware";
import {Context as AuthContext} from "../contexts/AuthContext";
import ErrorMsg from "../components/ErrorMsg";
import SuccessMsg from "../components/SuccessMsg";

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const ProfileScreen = ({navigation, route}) => {
    const {state,tryLocalLogin,logout} = useContext(AuthContext);
    const [user] = useCandidate();
    const[updateName,setUpdateName] = useState(user?.full_name);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [cv, setCv] = useState({});
    const [password,setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState("");
    const[success,setSuccess ] = useState("");
    const[isSuccess,setISSuccess ] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);
    const [totalFormDataObj, setTotalFormDataObj] = useState(new FormData());
    let formDataObj = new FormData();

    useEffect(()=>{
        setUpdateName(user?.full_name);
    },[user?.full_name])

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
        formDataObj.append('avatar', {
            uri,
            name: `avatar.${fileType}`,
            type: `image/${fileType}`,
        });
        setTotalFormDataObj(formDataObj);
    };

    // Document Picker Expo
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        //setResume(result);
        if (result) {
            const { name, uri } = result;
            const uriParts = name.split(".");
            const fileType = uriParts[uriParts.length - 1];
            formDataObj.append("cv", {
                uri,
                name,
                type: `application/${fileType}`,
            });
            setCv(result);
        }
        setTotalFormDataObj(formDataObj);

    };

    // update profile post api
    const updateProfile = async () => {
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
        if (updateName === "") {
            setError("name");
            setErrorMsg("Name field should not be empty");
            return;
        }
        formDataObj = totalFormDataObj;
        let formData = {
            full_name:updateName,
            current_password:password,
        };
        for (let key in formData) {
            formDataObj.append(
                key,
                Array.isArray(formData[key])
                    ? JSON.stringify(formData[key])
                    : formData[key]
            );
        }
        try {
            const response = await mediusware.post('/candidate/', formDataObj,{
                headers: {
                    Authorization: `Bearer ${state.token}`,
                    "Content-Type": "multipart/form-data",
                }
            });
            setError('');
            setErrorMsg('');
            setISSuccess(true);
            setSuccess("Updated your profile successfully.");
            setPassword('');
            setCv({});

        }catch(err){

        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
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

                <View  style={{flex: 8}}>
                    <View style={{position:'relative'}}>
                        <View>
                            <View style={{height:50}} backgroundColor={Colors.blue}/>
                            <View style={{height:50}} backgroundColor={Colors.white}/>
                        </View>
                        <View style={{position:'absolute',alignSelf:'center',marginTop:10}}>
                            {selectedImage !== null ?<Image source={{ uri: selectedImage.localUri}} style={{height:80,width:80,borderRadius:10}}/>:
                                (user?.avatar !== null ? <Image source={{ uri: user?.avatar}} style={{height:80,width:80,borderRadius:10}}/>:
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
                    <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 16}}>
                        <InputField title={'Name*'}  value={updateName} onChangeText={setUpdateName}/>
                        {error === "name" && <ErrorMsg msg={errorMsg} />}
                        <InputField title={'Email*'} placeholderText={'Your Email'} value={user?.email} editable={false}/>
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
                            <Text marginB-16 small_text blue onPress={()=>Linking.openURL(`${user?.cv}`)}>Current CV/Resume*</Text>
                        </View>
                        <InputField isIcon={true} title={'Current Password'} placeholderText={''} value={password} onChangeText={setPassword}/>
                        {error === "password" && <ErrorMsg msg={errorMsg} />}
                        {isSuccess && <SuccessMsg msg={success}/>}
                    </ScrollView>
                </View>
                <View flex-1 paddingH-16 >
                    <TouchableOpacity onPress={updateProfile}>
                        <FilledBtn title={'Save'}/>
                    </TouchableOpacity>
                </View>
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
        borderColor: '#E9E9E9',
        height: 32,
        borderWidth: 1,
        marginVertical: 8,
        borderRadius: 10,
        width: '35%'
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