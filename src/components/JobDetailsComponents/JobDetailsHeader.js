import React, {useContext} from 'react';
import {CommonActions, useIsFocused,useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Text, Colors} from "react-native-ui-lib";
import {StatusBar, StyleSheet} from 'react-native'
import WhiteLeftArrowIcon from "../../../assets/svgIcon/WhiteLeftArrowIcon";
import {Context as AuthContext} from "../../contexts/AuthContext";
function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}

const JobDetailsHeader = ({name,navigation}) => {
    const {state:{token}} = useContext(AuthContext);
   // const navigation = useNavigation();
    const navigateBack = () =>{
       token?.length > 0 ?  navigation.navigate('BottomNavigation',{screen:'Home'}) : navigation.navigate('JobsDetailsStackNavigation',{screen:'Home'})
    }
    return (
        <View row paddingV-16
              style={{position: 'relative', backgroundColor: Colors.blue}}>
            <TouchableOpacity onPress={navigateBack}>
                <View paddingH-16>
                    <WhiteLeftArrowIcon/>
                </View>
            </TouchableOpacity>
            <View style={{position: 'absolute', left: '15%', marginTop: 10}}>
                <Text subtitle1 style={{color: Colors.white}}>{name}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    headerStyle: {
        position: 'relative',
        borderBottomWidth: 1,
        borderColor: 'box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);'
    },
    blueHeaderStyle: {
        position: 'relative',
        backgroundColor: Colors.blue,
    }
})

export default JobDetailsHeader;
