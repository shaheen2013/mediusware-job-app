import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import JobsScreen from "../screens/JobsScreen";
import ExamProgress from "../screens/ExamProgressScreen";
import StackNavigation from "./StackNavigation";
import DrawerNavigation from "./DrawerNavigation";
import JobsStackNavigation from "./StackNavigators/JobsStackNavigation";
import DashboardStackNavigation from "./StackNavigators/DashboardStackNavigation";
import ProfileStackNavigation from "./StackNavigators/ProfileStackNavigation";
import HomeIcon from "../../assets/svgIcon/HomeIcon";
import { Feather } from '@expo/vector-icons';
import HomeFillIcon from "../../assets/svgIcon/HomeFillIcon";
import DashBoardIcon from "../../assets/svgIcon/DashBoardIcon";
import DashBoardOutlineIcon from "../../assets/svgIcon/DashBoardOutlineIcon";
import ProfileIcon from "../../assets/svgIcon/ProfileIcon";
import ProfileFilledIcon from "../../assets/svgIcon/ProfileFilledIcon";
import {Context as AuthContext} from "../contexts/AuthContext";
import LoginStackNavigation from "./StackNavigators/LoginStackNavigation";


const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
    const {state}= useContext(AuthContext);
    return (
        <Tab.Navigator
            tabBarStyle={styles.customTabBarStyle}
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    height: 55,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom:5,
                }
            }}>

            <Tab.Screen name="Home" component={JobsScreen} options={{
                tabBarLabel: 'HOME',
                tabBarLabelStyle: {fontSize: 12, fontFamily: 'Montserrat_400Regular'},
                tabBarIcon: ({focused}) => (
                    focused ? <HomeFillIcon/>:<HomeIcon/>
                )
            }}/>
           {/* <Tab.Screen name="DashboardStackNavigation" component={DashboardStackNavigation} options={{
                tabBarLabel: 'DASHBOARD',
                tabBarLabelStyle: {fontSize: 12, fontFamily: 'Montserrat_400Regular'},
                tabBarIcon: ({focused}) => (
                    focused  ?<DashBoardIcon/>:<DashBoardOutlineIcon/>
                )
            }}/>*/}
            {state?.token ?( <Tab.Screen name="DashboardStackNavigation" component={DashboardStackNavigation} options={{
                    tabBarLabel: 'DASHBOARD',
                    tabBarLabelStyle: {fontSize: 12, fontFamily: 'Montserrat_400Regular'},
                    tabBarIcon: ({focused}) => (
                        focused  ?<DashBoardIcon/>:<DashBoardOutlineIcon/>
                    )
                }}/>):
                (<Tab.Screen name="LoginStackNavigation2" component={LoginStackNavigation} options={{
                    tabBarLabel: 'DASHBOARD',
                    tabBarLabelStyle: {fontSize: 12, fontFamily: 'Montserrat_400Regular'},
                    tabBarIcon: ({focused}) => (
                        focused  ?<DashBoardIcon/>:<DashBoardOutlineIcon/>
                    )
                }}/>)
            }

            {state?.token ?(<Tab.Screen name="ProfileStackNavigation" component={ProfileStackNavigation} options={{
                tabBarLabel: 'Profile',
                tabBarLabelStyle: {fontSize: 12, fontFamily: 'Montserrat_400Regular'},
                tabBarIcon: ({focused}) => (
                    focused ? <ProfileFilledIcon/> : <ProfileIcon/>
                )
            }}/>):
                (<Tab.Screen name="LoginStackNavigation" component={LoginStackNavigation} options={{
                    tabBarLabel: 'Profile',
                    tabBarLabelStyle: {fontSize: 12, fontFamily: 'Montserrat_400Regular'},
                    tabBarIcon: ({focused}) => (
                        focused ? <ProfileFilledIcon/> : <ProfileIcon/>
                    )
                }}/>)
            }
        </Tab.Navigator>

    );
};

export default BottomNavigation;

const styles = StyleSheet.create({
    customTabBarStyle: {
        backgroundColor: 'blue'
    }

})