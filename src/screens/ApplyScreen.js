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


const ApplyScreen = ({navigation, route}) => {
    const {state,apply} = useContext(AuthContext);
    const isIcon = false;
    const [full_name,setFull_name] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [rePassword,setRePassword] = useState('');
    //const [Resume,setResume] = useState('');
    const [cv,setCv] = useState({});

    // Document Picker Expo
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        //setDocName(result.uri);
        setCv(result);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1}}>
                <CommonHeader name={route.name} navigation={navigation}/>
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            </View>

            <View paddingH-16 style={{flex: 12}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text subtitle4 blue marginB-10>Job application for “UX UI Designer</Text>
                    <View>
                        <Text text gray marginB-20>If already have Mediusware job account then please <Text
                            onPress={() => navigation.navigate('Login')} blue>Login</Text></Text>
                    </View>
                    <InputField
                        title={'Full Name*'}
                        placeholderText={'Enter Your Name'}
                        value={full_name}
                        onChangeText={setFull_name}
                    />
                    <InputField
                        title={'Email Address*'}
                        placeholderText={'Enter Your Email'}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <InputField
                        title={'Phone Number'}
                        placeholderText={'+880'}
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <InputField
                        isIcon={true}
                        title={'Password'}
                        placeholderText={'Enter Your Password'}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <InputField
                        isIcon={true}
                        title={'Re-Type Password'}
                        placeholderText={'Enter Your Re-Type Password'}
                        value={rePassword}
                        onChangeText={setRePassword}
                    />
                    <View>
                        <Text marginB-8 text>CV/Resume*</Text>
                        <View style={styles.uploadContainer}>
                            <View style={styles.uploadStyle}>
                                <TouchableOpacity paddingH-10 paddingV-3
                                 onPress={pickDocument}><Text blue subtitle3>Choose
                                    File</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.fileNameStyle} paddingH-10 paddingV-10>
                                <Text>{cv.name}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/*<TouchableOpacity marginV-15 onPress={() => navigation.navigate('ApplicantInformation')}>*/}
                <TouchableOpacity marginV-15 onPress={() => apply({full_name,email,phone,password,cv})}>
                    <FilledBtn title={'Continue'}/>
                </TouchableOpacity>
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
