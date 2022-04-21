import React from 'react';
import {Text, View, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {ScrollView, StyleSheet} from "react-native";
import InputField from "../formComponents/InputField";
import FilledBtn from "../buttons/FilledBtn";
const Register = ({full_name,setFull_name,email,setEmail,phone,setPhone,password,setPassword,rePassword,setRePassword,cv,setCv,pickDocument}) => {
    return (
        <View>
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
                    <View style={styles.fileNameStyle} paddingH-10 paddingV-4>
                        <Text>{cv?.name}</Text>
                    </View>
                </View>
            </View>
        </View>


    );
};

export default Register;

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