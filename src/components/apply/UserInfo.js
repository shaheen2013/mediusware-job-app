import React from 'react';
import {Text, View, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {ScrollView, StyleSheet, TextInput} from "react-native";
import InputField from "../formComponents/InputField";
import FilledBtn from "../buttons/FilledBtn";
const UserInfo = ({expSalary,setExpSalary,gitUrl,setGitUrl,linkedin,setLinkedin,comments,setComments}) => {
    return (
        <View>
            <View marginB-16>
                <Text marginB-8 text>What is your expected salary?*</Text>
                <View row>
                    <View style={styles.currencyContainer}>
                        <Text>BDT</Text>
                    </View>
                    <View style={styles.salaryContainer}>
                        <TextInput
                            value={expSalary}
                            onChangeText={setExpSalary}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            style={{
                                fontFamily: 'Montserrat_400Regular'
                            }}
                            placeholder={"Enter Your Expected Salary"}
                        />
                    </View>
                </View>
            </View>
            <InputField title={'GitHub URL*'}
                        value={gitUrl}
                        onChangeText={setGitUrl}
            />
            <InputField title={'Linkedin'}
                        value={linkedin}
                        onChangeText={setLinkedin}
            />
            <View>
                <Text marginB-8 text>Do you have anything to say to us?</Text>
                <View style={styles.textInputStyle}>
                    <TextInput
                        value={comments}
                        onChangeText={setComments}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        multiline={true}
                        numberOfLines={10}
                        style={{
                            textAlignVertical: 'top',
                            fontFamily: 'Montserrat_400Regular'
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
        borderColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        height: 100,
        paddingHorizontal: 16,
        marginBottom: 15,
    },
    currencyContainer: {
        borderColor: '#E9E9E9',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    salaryContainer: {
        borderColor: '#E9E9E9',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderLeftWidth: 0,
        height: 48,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flex: 6
    }
})