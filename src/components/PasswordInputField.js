import React from 'react';
import { Feather } from '@expo/vector-icons';
import {Text, View,TextInput,StyleSheet} from 'react-native';


const PasswordInputField = ({title,placeholderText}) => {
    return (
        <View>
            <Text style={{marginBottom:8}}>{title}</Text>
            <View style={{...styles.textInputStyle, ...styles.passwordContainer}}>
                <TextInput
                    style={{flex: 1}}
                    placeholder={placeholderText}
                    secureTextEntry={true}
                    // right={<TextInput.Icon name="eye-outline" color="#4D4D4D" />}
                />
                <Feather name="eye" size={24} color="black" style={{alignSelf: 'center', marginRight: 10}}/>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({

    forgotPasswordStyle: {
        fontSize: 14,
        alignSelf: "flex-end",
        color: '#004D8C',
        marginBottom: 50,
    },
    textInputStyle: {
        fontSize: 14,
        borderColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 15,
    },
    buttonStyle: {
        width: '100%',
        textAlign: 'center',
        height: 48,
        backgroundColor: '#0060AF',
        paddingVertical: 12,
        borderRadius: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    passwordContainer: {
        flexDirection: 'row',
    }
})
export default PasswordInputField;
