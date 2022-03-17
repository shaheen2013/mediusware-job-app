import React from 'react';
import { CommonActions } from '@react-navigation/native';
import {Text, View} from 'react-native';
import LeftArrowIcon from "../../assets/svgIcon/LeftArrowIcon";
import {TouchableOpacity} from "react-native-ui-lib";

const CommonHeader = ({name,navigation}) => {
    return (
        <View style={{paddingVertical:16,flexDirection:'row',position:'relative',marginVertical:10,borderBottomWidth:1,borderColor:'box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);'}}>
            <View style={{paddingHorizontal:16}}>
                <TouchableOpacity onPress={()=>navigation.dispatch(CommonActions.goBack())}>
                    <LeftArrowIcon/>
                </TouchableOpacity>

            </View>
            <View style={{position:'absolute',left:'15%',marginTop:10}}>
                <Text style={{fontSize:16,fontFamily:'Montserrat_600SemiBold'}}>{name}</Text>
            </View>

        </View>
    );
};

export default CommonHeader;
