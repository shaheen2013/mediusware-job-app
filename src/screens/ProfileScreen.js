import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, Colors, Image} from 'react-native-ui-lib';
import CommonHeader from "../components/CommonHeader";
import {StatusBar, ScrollView, StyleSheet} from "react-native";
import FilledBtn from "../components/buttons/FilledBtn";
import {useIsFocused} from "@react-navigation/native";
import JobDetailsHeader from "../components/JobDetailsComponents/JobDetailsHeader";
import ProfileHeader from "../components/ProfileHeader";
import { Feather } from '@expo/vector-icons';
import InputField from "../components/formComponents/InputField";

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const ProfileScreen = ({navigation, route}) => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <View flex-1>
                <ProfileHeader name={'Profile'} navigation={navigation}/>
                <FocusAwareStatusBar barStyle={Colors.white} backgroundColor={Colors.blue}/>
                <View  style={{flex: 8}}>
                    <View style={{position:'relative'}}>
                        <View>
                            <View style={{height:50}} backgroundColor={Colors.blue}/>
                            <View style={{height:50}} backgroundColor={Colors.white}/>
                        </View>
                        <View style={{position:'absolute',alignSelf:'center',marginTop:10}}>
                            <Image source={require("../../assets/images/profile.png")}/>
                        </View>
                        <View  style={{position:'absolute',marginTop:'15%',marginLeft:'52%'}} >
                            <TouchableOpacity>
                                <View backgroundColor={Colors.white} paddingV-5 paddingL-6 style={{borderRadius:15,elevation: 2,width:40}}>
                                    <Feather name="camera" size={26} color="#4D4D4D" />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 16}}>
                        <InputField title={'Name*'} placeholderText={'Jack Janson'}/>
                        <InputField title={'Email*'} placeholderText={'example@mail.com'}/>
                        <View>
                            <Text marginB-8 text>CV/Resume*</Text>
                            <View style={styles.uploadContainer}>
                                <View style={styles.uploadStyle}>
                                    <TouchableOpacity paddingH-10 paddingV-3><Text blue subtitle3>Choose
                                        File</Text></TouchableOpacity>
                                </View>
                            </View>
                            <Text marginB-16 small_text blue>Current CV/Resume*</Text>
                        </View>
                        <InputField isIcon={true} title={'Current Password'} placeholderText={''}/>
                    </ScrollView>

                </View>

                <View flex-1 paddingH-16 >
                    <TouchableOpacity>
                        <FilledBtn title={'Save'}/>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    uploadContainer: {
        borderColor: '#E9E9E9',
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    uploadStyle: {
        borderColor: '#E9E9E9',
        height: 32,
        borderWidth: 1,
        marginVertical: 8,
        borderRadius: 10,
        width: '33%'
    }
})