import React from 'react';

import {Text, View,styleSheet} from 'react-native';
import LeftIcon from '../../assets/svgIcon/LeftIcon';
import Logo from "../../assets/svgIcon/Logo";
const JobsScreen = () => {
    return (
        <View>
            <Text style={{fontSize:24,paddingVertical:6,fontFamily:'Montserrat_800ExtraBold'}}>This is Job Screen</Text>
            <LeftIcon width={40} height={40}/>
            <Logo width={115} height={32}/>
        </View>
    );
};

export default JobsScreen;


//fontSize:24,paddingVertical:6,fontFamily:'Montserrat_800ExtraBold'