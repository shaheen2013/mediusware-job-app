import {StyleSheet, Text, View, StatusBar} from 'react-native';
import AppLoading from 'expo-app-loading';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Typography, Colors, Spacings} from 'react-native-ui-lib';
import Logo from "./assets/svgIcon/Logo";
import JobsScreen from "./src/screens/JobsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';
import DrawerNavigation from "./src/navigations/DrawerNavigation";
import {Provider as AuthProvider} from './src/contexts/AuthContext'
//import BottomNavigation from "./src/navigations/BottomNavigation";
//import StackNavigation from "./src/navigations/StackNavigation";


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

    // will be removed....
    iconBg: '#F3F7FB',
    primaryTextColor: '#004D8C',
    headerTextColor: '#2B2B2B',
    lightBtnTextColor: '#3378B1',
    regularTextColor: '#4D4D4D',
    primaryColor: '#0060AF',
    primaryBtnTextColor: '#FFF',
});

Typography.loadTypographies({
    h1: {fontSize: 48, fontFamily: 'Montserrat_400Regular'},
    h2: {fontSize: 34, fontFamily: 'Montserrat_400Regular'},
    h3: {fontSize: 24, fontFamily: 'Montserrat_400Regular'},
    h4: {fontSize: 20, fontFamily: 'Montserrat_500Medium'},
    h5: {fontSize: 24, fontFamily: 'Montserrat_500Medium'},
    subtitle1: {fontSize: 16, fontFamily: 'Montserrat_600SemiBold'},
    subtitle2: {fontSize: 16, fontFamily: 'Montserrat_400Regular'},
    subtitle3: {fontSize: 14, fontFamily: 'Montserrat_500Medium'},
    subtitle4: {fontSize: 16, fontFamily: 'Montserrat_500Medium'},
    text: {fontSize: 14, fontFamily: 'Montserrat_400Regular'},
    btn_text: {fontSize: 14, fontFamily: 'Montserrat_600SemiBold'},
    small_text: {fontSize: 12, fontFamily: 'Montserrat_500Medium'},
    caption: {fontSize: 12, fontFamily: 'Montserrat_400Regular'},
    overline: {fontSize: 10, fontFamily: 'Montserrat_400Regular'},

    // will be removed .....
    headerText: {fontSize: 24, fontFamily: 'Montserrat_500Medium'},
    subTitleText: {fontSize: 16, fontFamily: 'Montserrat_500Medium'},
    primaryText: {fontSize: 14, fontFamily: 'Montserrat_400Regular'},
    primaryBtnText: {fontSize: 14, fontFamily: 'Montserrat_600SemiBold'},
    regularText: {fontSize: 12, fontFamily: 'Montserrat_400Regular'},
    screenTitle: {fontSize: 16, fontFamily: 'Montserrat_600SemiBold'},


});

Spacings.loadSpacings({});

export default function App() {

    let [fontsLoaded] = useFonts({
        Montserrat_300Light,
        Montserrat_200ExtraLight,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <AuthProvider>
                <SafeAreaProvider>
                    <NavigationContainer theme={navTheme}>
                        <DrawerNavigation/>
                    </NavigationContainer>
                </SafeAreaProvider>
            </AuthProvider>
        );
    }

}
