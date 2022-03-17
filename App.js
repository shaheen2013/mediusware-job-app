import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import {DefaultTheme,NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Typography, Colors, Spacings} from 'react-native-ui-lib';
import Logo from "./assets/svgIcon/Logo";
import JobsScreen from "./src/screens/JobsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { createDrawerNavigator } from '@react-navigation/drawer';
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


const navTheme = {
    ...DefaultTheme, colors: {
        ...DefaultTheme.colors, background: 'white',
    },
};

Colors.loadColors({
    pink: '#FF69B4',
    gold: '#FFD700',
    iconBg: '#F3F7FB',
    iconBg2:'#FFF'
});

Typography.loadTypographies({
    h3: {fontSize: 20, fontWeight: '500' },
    h2: {fontSize: 46, fontWeight: '300', lineHeight: 64},
});

Spacings.loadSpacings({

});

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
    }else{
        return (
            <SafeAreaProvider>
                <NavigationContainer theme={navTheme}>
                    <DrawerNavigation/>
                    {/*<Stack.Navigator screenOptions={{
                        headerShown: false,
                    }}>
                        <Stack.Screen name="Jobs" component={JobsScreen}/>
                        <Stack.Screen name="Login" component={LoginScreen}/>
                    </Stack.Navigator>*/}

                </NavigationContainer>
            </SafeAreaProvider>

        );
    }

}
