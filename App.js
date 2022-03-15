import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import JobsScreen from "./src/screens/JobsScreen";

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
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <JobsScreen/>
            </View>
        );
    }

}
