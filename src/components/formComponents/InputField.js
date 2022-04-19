import React, {useContext, useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {TextInput, StyleSheet} from 'react-native';
import {Text, View, TouchableOpacity} from 'react-native-ui-lib';


const InputField = ({title, placeholderText, isIcon,value,onChangeText}) => {
    const [visibleText, setVisibleText] = useState(true);
    return (
        <View>
            <Text marginB-8 text>{title}</Text>
            <View style={{...styles.textInputStyle}} row>
                <TextInput
                    style={{
                        flex: 1,
                        fontFamily: 'Montserrat_400Regular'
                    }}
                    value={value}
                    onChangeText={onChangeText}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    placeholder={placeholderText}
                    secureTextEntry = {isIcon ?(visibleText ? true : false):false}
                />
                {
                    isIcon &&
                    <TouchableOpacity
                        style={{
                            alignSelf: 'center'
                        }}
                        marginR-10
                        onPress={() => setVisibleText(!visibleText)}>
                        <Feather name={visibleText ? "eye-off" : "eye"} size={24} color="black"/>
                    </TouchableOpacity>
                }
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    textInputStyle: {
        borderColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 15,
    }
})
export default InputField;
