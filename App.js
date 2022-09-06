import {
    Montserrat_200ExtraLight, Montserrat_300Light, Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    useFonts
} from "@expo-google-fonts/montserrat";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, Spacings, Typography } from 'react-native-ui-lib';
import { Provider as AssessmentProvider } from './src/contexts/AssessmentContext';
import { Provider as AuthProvider } from './src/contexts/AuthContext';
import { Provider as UserProvider } from './src/contexts/UserContext';
import DrawerNavigation from "./src/navigations/DrawerNavigation";

const navTheme = {
    ...DefaultTheme, colors: {
        ...DefaultTheme.colors, background: 'white',
    },
    StatusBar: {
        ...DefaultTheme, barStyle: 'light-content', backgroundColor: 'white'
    }
};

Colors.loadColors({
    white: '#FFFFFF',
    gray: '#4D4D4D',
    blackGray:'#333333',
    lightGray: '#949494',
    deepGray: '#2B2B2B',
    borderColor: '#E9E9E9',
    blue: '#0060AF',
    lightBlue: '#3378B1',
    deepBlue: '#004D8C',
    bgColor: '#F3F7FB',
    lightColor: '#D9E7F3',
    warningColor:'#FF0000',

});

Typography.loadTypographies({
    h1: {fontSize: 48, fontFamily: 'Montserrat_400Regular'},
    h2: {fontSize: 34, fontFamily: 'Montserrat_400Regular'},
    h3: {fontSize: 24, fontFamily: 'Montserrat_400Regular'},
    h4: {fontSize: 20, fontFamily: 'Montserrat_500Medium'},
    h5: {fontSize: 24, fontFamily: 'Montserrat_500Medium'},
    title: {fontSize: 20, fontFamily: 'Montserrat_600SemiBold'},
    subtitle1: {fontSize: 16, fontFamily: 'Montserrat_600SemiBold'},
    subtitle2: {fontSize: 16, fontFamily: 'Montserrat_400Regular'},
    subtitle3: {fontSize: 14, fontFamily: 'Montserrat_500Medium'},
    subtitle4: {fontSize: 16, fontFamily: 'Montserrat_500Medium'},
    text: {fontSize: 14, fontFamily: 'Montserrat_400Regular'},
    btn_text: {fontSize: 14, fontFamily: 'Montserrat_600SemiBold'},
    small_text: {fontSize: 12, fontFamily: 'Montserrat_500Medium'},
    caption: {fontSize: 12, fontFamily: 'Montserrat_400Regular'},
    overline: {fontSize: 10, fontFamily: 'Montserrat_400Regular'},

});

Spacings.loadSpacings({});
SplashScreen.preventAutoHideAsync();

export default function App() {
    let [fontsLoaded] =  useFonts({
        Montserrat_300Light,
        Montserrat_200ExtraLight,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
    });
    if (!fontsLoaded) {
         SplashScreen.hideAsync();
        return null;
    } else { 
        return (
            <AuthProvider>
                <UserProvider>
                    <AssessmentProvider>
                        <SafeAreaProvider>
                            <NavigationContainer theme={navTheme}>
                                <DrawerNavigation/>
                            </NavigationContainer>
                        </SafeAreaProvider>
                    </AssessmentProvider>
                </UserProvider>
            </AuthProvider>
        );
    }

}
