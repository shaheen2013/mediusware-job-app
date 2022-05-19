import {Feather} from "@expo/vector-icons";
import React, {forwardRef, useState} from "react";
import {StyleSheet, TextInput} from "react-native";
import {Colors, Text, TouchableOpacity, View} from "react-native-ui-lib";

const InputField = forwardRef(({
                                   title,
                                   placeholderText,
                                   isIcon,
                                   touched,
                                   error,
                                   value,
                                   onChangeText,
                                   keyboardType,
                                   autoComplete,
                                   onBlur,
                                   autoCorrect,
                                   spellCheck,
                                   autoCapitalize,
                                   editable,
                                   importantForAutofill

                               }, ref) => {
    const validationColor = !touched ? Colors.borderColor : error ? '#FF5A5F' : Colors.borderColor;
    const [visibleText, setVisibleText] = useState(true);
    return (
        <View>
            <Text marginV-8 text>
                {title}
            </Text>
            <View row style={{...styles.textInputStyle, borderColor: validationColor}}>
                <TextInput
                    style={{
                        flex: 1,
                        fontFamily: "Montserrat_400Regular",
                    }}
                    editable={editable}
                    keyboardType={keyboardType}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChangeText}
                    autoCorrect={autoCorrect}
                    spellCheck={spellCheck}
                    placeholder={placeholderText}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    secureTextEntry={isIcon ? visibleText : false}

                />
                {isIcon && (
                    <TouchableOpacity
                        style={{
                            alignSelf: "center",
                        }}
                        marginR-10
                        onPress={() => setVisibleText(!visibleText)}
                    >
                        <Feather
                            name={visibleText ? "eye-off" : "eye"}
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error ? (
                <Text style={{color: 'red'}} marginV-4 text>{error}</Text>
            ) : (
                <></>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    textInputStyle: {
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 7,
    },
    /*borderColorStyle:{
          borderColor: Colors.borderColor,
      },
      focusBorderColorStyle:{
          borderColor: Colors.blue,
      }*/
});
export default InputField;
