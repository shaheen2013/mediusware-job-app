import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
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
   // const [appIsReady, setAppIsReady] = useState(false);

    let [fontsLoaded] =  useFonts({
        Montserrat_300Light,
        Montserrat_200ExtraLight,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
    });

    // useEffect(() => {
    //     async function prepare() {
    //       try {
    //         /* await Font.useFonts({
    //             Montserrat_300Light,
    //             Montserrat_200ExtraLight,
    //             Montserrat_400Regular,
    //             Montserrat_500Medium,
    //             Montserrat_600SemiBold,
    //             Montserrat_700Bold,
    //             Montserrat_800ExtraBold,
    //         }); */
    //         // Pre-load fonts, make any API calls you need to do here
    //          await Font.loadAsync(fontsLoaded);
    //         // Artificially delay for two seconds to simulate a slow loading
    //         // experience. Please remove this if you copy and paste the code!
    //         await new Promise(resolve => setTimeout(resolve, 2000));
    //       } catch (e) {
    //         console.warn(e);
    //       } finally {
    //         // Tell the application to render
    //         setAppIsReady(true);
    //       }
    //     }
    //     prepare();
    //   }, []);

      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
      

    /* let [fontsLoaded] = useFonts({
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
    } else { */
        return (
            <AuthProvider>
                <UserProvider>
                    <AssessmentProvider>
                        <SafeAreaProvider>
                            <NavigationContainer theme={navTheme} onLayout={onLayoutRootView}>
                                <DrawerNavigation/>
                            </NavigationContainer>
                        </SafeAreaProvider>
                    </AssessmentProvider>
                </UserProvider>
            </AuthProvider>
        );
   // }

}
