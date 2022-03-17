import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, StyleSheet} from 'react-native';
import Logo from "../../assets/svgIcon/Logo";
import HeaderTitle from "../components/HeaderTitle";

const JobsScreen = ({navigation}) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <HeaderTitle navigation={navigation}/>
                <Text>This is Jobs screen</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    }
})
export default JobsScreen;


//fontFamily:'Montserrat_800ExtraBold'