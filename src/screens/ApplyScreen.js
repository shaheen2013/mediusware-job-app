import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import OutlineBtn from "../components/buttons/OutlineBtn";
import FilledBtn from "../components/buttons/FilledBtn";
import {StatusBar, StyleSheet,ScrollView} from "react-native";
import {Feather} from "@expo/vector-icons";
import {Context as AuthContext} from '../contexts/AuthContext';
import * as DocumentPicker from 'expo-document-picker';
import Register from "../components/apply/Register";
import BlueOutlineBtn from "../components/buttons/BlueOutlineBtn";
import UserInfo from "../components/apply/UserInfo";


const ApplyScreen = ({navigation, route}) => {
    const {state,register,login,apply} = useContext(AuthContext);
    const {title,job_slug} = route.params;
    const isIcon = false;
    const [full_name,setFull_name] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [rePassword,setRePassword] = useState('');
    const [cv,setCv] = useState({});
    const [isRegister,setIsRegister] = useState(true);
    const [expSalary,setExpSalary] = useState('');
    const [gitUrl, setGitUrl] = useState('');
    const [linkedin,setLinkedin] = useState('');
    const [comments,setComments] = useState('');
    const[addionalfields,setAdditionalFields] = useState([]);
    const [totalFormDataObj,setTotalFormDataObj] = useState(new FormData());
    let formDataObj = new FormData();
    const [errorMsg,setErrorMsg] = useState('');
    const [error,setError] = useState('');

    // Document Picker Expo
    const pickDocument = async () => {
         let result =  await DocumentPicker.getDocumentAsync({});
        //setResume(result);
        const {name, uri} = result;
        const uriParts = name.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formDataObj.append('cv', {
            uri,
            name,
            type: `application/${fileType}`,
        })
        setCv(result);
        setTotalFormDataObj(formDataObj);
        console.log(formDataObj);
    };

    const registration =  () =>{
        if(full_name  === ""){
            setError("name");
            setErrorMsg("Please, Enter your Name");
            return;
        }
        if(email  === ""){
            setError("email");
            setErrorMsg("Please, Enter your Email Address");
            return;
        }
        if(phone  === ""){
            setError("phone");
            setErrorMsg("Please, Enter your Phone Number");
            return;
        }
        if(phone.length !== 10){
            setError("phone");
            setErrorMsg("Phone Number should be 10 digits without Beginning 0");
            return;
        }

        if(password  === ""){
            setError("password");
            setErrorMsg("Please, Enter your Password");
            return;
        }

        if(password.length < 6){
            setError("password");
            setErrorMsg("Password Should be more than 6 character long");
            return;
        }
        if(password !== rePassword){
            setError("re_password");
            setErrorMsg("Passwords are not matched!!!");
            return;
        }
        if(password !== rePassword){
            setError("re_password");
            setErrorMsg("Passwords are not matched!!!");
            return;
        }
        formDataObj = totalFormDataObj;
        let formData = {
            full_name,phone,email,password
        }
        for (let key in formData) {
            formDataObj.append(key, Array.isArray(formData[key]) ? JSON.stringify(formData[key]) : formData[key]);
        }
        // call register method for user registration
        register(formDataObj).then(()=>login({email,password}));
        setTotalFormDataObj(new FormData());
        setIsRegister(false);
        //apply({expSalary,gitUrl,linkedin,comments});
       //await login({email,password})

        // clear all data
        /*setFull_name('');
        setEmail('');
        setPhone('');
        setPassword('');
        setRePassword('');
        setCv({});*/

    }

    const submit = () =>{
        //setAdditionalFields([gitUrl,5,linkedin]);
        apply({job_slug,expected_salary:expSalary,additional_message:comments,additional_fields:[gitUrl,"5",linkedin]});
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CommonHeader name={route.name} navigation={navigation}/>
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            </View>

            <View paddingH-16 style={{flex: 12}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text subtitle4 blue marginB-10>{title}</Text>
                    <View>
                        <Text text gray marginB-20>If already have Mediusware job account then please <Text
                            onPress={() => navigation.navigate('Login')} blue>Login</Text></Text>
                    </View>
                    { isRegister ?
                        <Register full_name={full_name} setFull_name={setFull_name}
                               phone={phone} setPhone={setPhone}
                               email={email} setEmail={setEmail}
                               password={password} setPassword={setPassword}
                               rePassword={rePassword} setRePassword={setRePassword}
                               cv={cv} setCv={setCv} errorMsg={errorMsg} error={error}
                               pickDocument={pickDocument}/>
                        :
                        <UserInfo expSalary={expSalary} setExpSalary={setExpSalary}
                                  gitUrl={gitUrl} setGitUrl={setGitUrl}
                                  linkedin={linkedin} setLinkedin={setLinkedin}
                                  comments={comments} setComments={setComments}
                        />

                    }

                </ScrollView>
                { isRegister ? <TouchableOpacity marginV-15
                                   onPress={registration}>
                    {/*<TouchableOpacity marginV-15 onPress={registration}>*/}
                    <FilledBtn title={'Continue'}/>
                </TouchableOpacity>
                :
                    <View row marginV-15>
                        <TouchableOpacity flex-1 marginR-10 onPress={() => setIsRegister(true)}>
                            <BlueOutlineBtn title={'Back'}/>
                        </TouchableOpacity>
                        <TouchableOpacity flex-1 onPress={submit}>
                            {/*<TouchableOpacity flex-1 onPress={() => navigation.navigate('Submission')}>*/}
                            <FilledBtn title={'Submit'}/>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    uploadContainer: {
        borderColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 15,
        position:'relative',
    },
    uploadStyle: {
        borderColor: '#E9E9E9',
        height: 32,
        borderWidth: 1,
        marginVertical: 8,
        borderRadius: 10,
        width: '33%',
    },
    fileNameStyle:{
        position:'absolute',
        marginLeft:'40%',
    }
})

export default ApplyScreen;
