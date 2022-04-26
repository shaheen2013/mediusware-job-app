import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";

const InputField = ({
  title,
  placeholderText,
  isIcon,
  value,
  onChangeText,
  keyboardType,
    editable
}) => {
  const [visibleText, setVisibleText] = useState(true);
  const [focus, setFocus] = useState(false);
  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  const customStyle = focus
    ? { ...styles.textInputStyle, borderColor: Colors.blue }
    : { ...styles.textInputStyle, borderColor: Colors.borderColor };
  return (
    <View>
      <Text marginV-8 text>
        {title}
      </Text>
      <View style={customStyle} row>
        <TextInput
          style={{
            flex: 1,
            fontFamily: "Montserrat_400Regular",
          }}
          editable={editable}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={"none"}
          autoCorrect={false}
          placeholder={placeholderText}
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
    </View>
  );
};

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
