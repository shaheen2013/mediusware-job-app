import React from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import ErrorMsg from "../ErrorMsg";
import InputField from "../formComponents/InputField";
const Register = ({
  full_name,
  setFull_name,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  rePassword,
  setRePassword,
  cv,
  setCv,
  pickDocument,
  errorMsg,
  error,
}) => {
  return (
    <View>
      <InputField
        title={"Full Name*"}
        placeholderText={"Enter Your Name"}
        value={full_name}
        onChangeText={setFull_name}
      />
      {error === "name" && <ErrorMsg msg={errorMsg} />}
      <InputField
        title={"Email Address*"}
        placeholderText={"Enter Your Email"}
        value={email}
        onChangeText={setEmail}
      />
      {error === "email" && <ErrorMsg msg={errorMsg} />}

      <InputField
        title={"Phone Number"}
        placeholderText={"+880"}
        value={phone}
        onChangeText={setPhone}
      />
      {error === "phone" && <ErrorMsg msg={errorMsg} />}

      <InputField
        isIcon={true}
        title={"Password"}
        placeholderText={"Enter Your Password"}
        value={password}
        onChangeText={setPassword}
      />
      {error === "password" && <ErrorMsg msg={errorMsg} />}
      <InputField
        isIcon={true}
        title={"Re-Type Password"}
        placeholderText={"Enter Your Re-Type Password"}
        value={rePassword}
        onChangeText={setRePassword}
      />
      {error === "re_password" && <ErrorMsg msg={errorMsg} />}

      <View>
        <Text marginB-8 text>
          CV/Resume*
        </Text>
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
        {error === "cv" && <ErrorMsg msg={errorMsg} />}
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  uploadContainer: {
    borderColor: "#E9E9E9",
    borderRadius: 10,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 15,
    position: "relative",
  },
  uploadStyle: {
    borderColor: "#E9E9E9",
    height: 32,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 10,
    width: "35%",
  },
  fileNameStyle: {
    position: "absolute",
    marginLeft: "40%",
  },
});
