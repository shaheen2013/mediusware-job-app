import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, View } from "react-native-ui-lib";
import ErrorMsg from "../ErrorMsg";
import InputField from "../formComponents/InputField";
const UserInfo = ({
  expSalary,
  setExpSalary,
  gitUrl,
  setGitUrl,
  linkedin,
  setLinkedin,
  comments,
  setComments,
  experience,
  setExperience,
  errorMsg,
  error,
}) => {
  return (
    <View>
      <View marginB-8>
        <Text marginB-8 text>
          What is your expected salary?*
        </Text>
        <View row>
          <View style={styles.currencyContainer}>
            <Text>BDT</Text>
          </View>
          <View style={styles.salaryContainer}>
            <TextInput
              keyboardType="numeric"
              value={expSalary}
              onChangeText={setExpSalary}
              autoCapitalize={"none"}
              autoCorrect={false}
              style={{
                fontFamily: "Montserrat_400Regular",
              }}
              placeholder={"Enter Your Expected Salary"}
            />
          </View>
        </View>
      </View>
      {error === "expSalary" && <ErrorMsg msg={errorMsg} />}
      <InputField
        keyboardType="numeric"
        title={"Professional Experience (Years)*"}
        style={{ marginTop: 8 }}
        value={experience}
        onChangeText={setExperience}
      />
      {error === "experience" && <ErrorMsg msg={errorMsg} />}
      <InputField
        title={"GitHub URL*"}
        value={gitUrl}
        onChangeText={setGitUrl}
      />
      {error === "github" && <ErrorMsg msg={errorMsg} />}
      <InputField
        title={"Linkedin*"}
        value={linkedin}
        onChangeText={setLinkedin}
      />
      {error === "linkedin" && <ErrorMsg msg={errorMsg} />}
      <View>
        <Text marginB-8 text>
          Do you have anything to say to us?
        </Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={comments}
            onChangeText={setComments}
            autoCapitalize={"none"}
            autoCorrect={false}
            multiline={true}
            numberOfLines={10}
            style={{
              textAlignVertical: "top",
              fontFamily: "Montserrat_400Regular",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: "#E9E9E9",
    borderRadius: 10,
    borderWidth: 1,
    height: 100,
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  currencyContainer: {
    borderColor: "#E9E9E9",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    height: 48,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  salaryContainer: {
    borderColor: "#E9E9E9",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    height: 48,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flex: 6,
  },
});
