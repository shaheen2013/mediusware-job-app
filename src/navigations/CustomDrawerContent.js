import React, {useContext, useEffect} from 'react';
import { Feather,MaterialCommunityIcons  } from '@expo/vector-icons';
import {StyleSheet, RefreshControl} from 'react-native';
import {Colors, Text, View, TouchableOpacity, Image} from 'react-native-ui-lib'
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import MediuswareIcon from "../../assets/svgIcon/MediuswareIcon";
import {Context as AuthContext} from "../contexts/AuthContext";
import {Context as UserContext} from "../contexts/UserContext";
import DashBoardOutlineIcon from "../../assets/svgIcon/DashBoardOutlineIcon";
import ApplicationIcon from "../../assets/svgIcon/ApplicationIcon";
import ExaminationIcon from "../../assets/svgIcon/ExaminationIcon";
import LogoutIcon from "../../assets/svgIcon/LogoutIcon";
import logo from "../../assets/svgIcon/Logo";
import { StackActions } from '@react-navigation/native';


const CustomDrawerContent = (props) => {
    const {state:{token},logout,tryLocalLogin} = useContext(AuthContext);
    const {state:{user},getUser} = useContext(UserContext);


    useEffect(()=>{
        getUser(token);
    },[user?.user?.avatar,user?.user?.full_name,user?.user?.cv])

    return (
        <View style={{flex:1,backgroundColor:'#F3F7FB',paddingHorizontal:16}}>
            <DrawerContentScrollView {...props}>
                <View>
                    <View style={{marginTop:8}}>
                        <View row marginB-30 style={{position: 'relative'}}>
                            <TouchableOpacity onPress={()=>props.navigation.closeDrawer()}>
                                <View style={styles.iconStyle}>
                                    <Feather name="menu" size={24} color="black"/>
                                </View>
                            </TouchableOpacity>
                            <View style={{position:'absolute',left:'30%',marginTop:5}}>
                                <MediuswareIcon/>
                            </View>

                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            {
                                (token && user?.user?.avatar) ? <Image source={{ uri: user?.user?.avatar}} style={{height:60,width:60,borderRadius:10}}/>:
                                    <View style={styles.userIconStyle}>
                                        <Feather name="user" size={36} color="black"/>
                                    </View>
                            }
                            <View marginL-10 style={{flexShrink: 1}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize: 20, fontFamily: 'Montserrat_500Medium',flexShrink: 1}}>{token ? user?.user?.full_name:"Guest User"}</Text>
                                </View>

                                {
                                    token? <View style={{flexShrink: 1}}>
                                            <Text gray text multiline={true} style={{flexShrink:1}}>{user?.user?.email}</Text>
                                        </View>
                                        :
                                        <TouchableOpacity
                                            onPress={() => props.navigation.navigate('LoginStackNavigation', {screen: 'Login'})}>
                                            <View style={{paddingVertical: 5, flexDirection: 'row'}}>
                                                <Text style={{
                                                    color: 'blue',
                                                    fontFamily: 'Montserrat_500Medium',
                                                    marginRight: 5
                                                }}>Login</Text>
                                                <MaterialCommunityIcons name="login" size={24} color="blue"/>
                                            </View>
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                        {token && <View marginT-40 style={{flexDirection:'column',justifyContent:'space-between'}}>
                            <View>
                                <DrawerItem label={"Dashboard"} style={{marginBottom: -10, marginLeft: 0}}
                                            labelStyle={{color: Colors.gray, fontSize: 16, fontFamily: 'Montserrat_500Medium'}}
                                            icon={({focused}) => <DashBoardOutlineIcon/>}
                                            onPress={() => {
                                                props.navigation.closeDrawer();
                                                props.navigation.navigate('DashboardStackNavigation',{screen:'Dashboard'});
                                            }}
                                />
                                <DrawerItem label={"Application"} style={{marginBottom: -10, marginLeft: 0}}
                                            labelStyle={{color: Colors.gray, fontSize: 16, fontFamily: 'Montserrat_500Medium'}}
                                            icon={({focused}) => <ApplicationIcon/>}
                                            onPress={() => {
                                                props.navigation.closeDrawer();
                                                props.navigation.navigate('DashboardStackNavigation',{screen:'Dashboard'});

                                            }}
                                />
                                <DrawerItem label={"Examination"} style={{marginBottom: -10, marginLeft: 0}}
                                            labelStyle={{color: Colors.gray, fontSize: 16, fontFamily: 'Montserrat_500Medium'}}
                                            icon={({focused}) => <ExaminationIcon/>}
                                            onPress={() => {
                                               // logout();
                                                props.navigation.navigate('ExamStackNavigation',{screen:'Examination'});
                                                props.navigation.closeDrawer();
                                            }}
                                />
                            </View>
                        </View>}
                    </View>
                </View>
            </DrawerContentScrollView>
            {
                token && (
                    <View style={{justifyContent:'flex-end'}}>
                        <DrawerItem label={"Logout"} style={{marginBottom: 20, marginLeft: 0}}
                                    labelStyle={{color: Colors.gray, fontSize: 16, fontFamily: 'Montserrat_500Medium'}}
                                    icon={({focused}) => <LogoutIcon/>}
                                    onPress={()=>{
                                        props.navigation.closeDrawer();
                                        props.navigation.navigate('Home');
                                        logout()
                                    }}
                        />
                    </View>
                )
            }

        </View>

    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    menuItemsCard: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    circleContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 10,
    },
    iconStyle:{
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 12,
    },
    userIconStyle:{
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 12,
    }
});

