import React from 'react';
import { Feather,MaterialCommunityIcons  } from '@expo/vector-icons';
import {Text, useWindowDimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import MediuswareIcon from "../../assets/svgIcon/MediuswareIcon";
import {Colors} from "react-native-ui-lib";

const CustomDrawerContent = (props) => {
    const width = useWindowDimensions().width * 0.3;
    return (
        <DrawerContentScrollView {...props} style={{backgroundColor:'#F3F7FB',paddingHorizontal:16}}>
            <View>
                <View>
                    <View style={{flexDirection:'row',position: 'relative',marginBottom:30}}>
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
                        <View style={styles.userIconStyle}>
                            <Feather name="user" size={36} color="black"/>
                        </View>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:20,fontFamily:'Montserrat_500Medium'}}>Guest User</Text>
                            <TouchableOpacity onPress={()=> props.navigation.navigate('Login')}>
                                <View style={{paddingVertical:5,flexDirection:'row'}}>
                                    <Text style={{color:'blue',fontFamily:'Montserrat_500Medium',marginRight:5}}>Login</Text>
                                    <MaterialCommunityIcons name="login" size={24} color="blue" />
                                </View>
                            </TouchableOpacity>
                               {/* <DrawerItem
                                    style={{margin:0}}
                                    label="Login"
                                    labelStyle={{ color:'blue'}}
                                    onPress={() => {
                                        props.navigation.navigate('Login');
                                    }}
                                />*/}

                        </View>
                    </View>
                </View>
                {/*<View
                    style={[
                        styles.menuItemsCard,
                        { backgroundColor: '#fff2df', width: width, height: width },
                    ]}>
                    <>
                        <View
                            style={[styles.circleContainer, { backgroundColor: '#FFC56F' }]}>
                            <Feather name="user" size={24} color="black" />
                            <DrawerItem
                                label="Login"
                                labelStyle={{ color: '#fbae41', fontSize: 10 }}
                                onPress={() => {
                                    props.navigation.navigate('login');
                                }}
                            />
                        </View>
                    </>
                    <DrawerItem
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: width,
                            height: width,
                        }}
                        label="Jobs"
                        labelStyle={{ color: '#609806' }}
                        onPress={() => {
                            props.navigation.navigate('Jobs');
                        }}
                    />
                </View>*/}
                {/*<View
                    style={[
                        styles.menuItemsCard,
                        { backgroundColor: '#EFFFD5', width: width, height: width },
                    ]}>
                    <View
                        style={[styles.circleContainer, { backgroundColor: '#b5ff39' }]}>
                        <Feather Medical name="briefcase" size={25} color="#609806" />
                    </View>

                    <DrawerItem
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: width,
                            height: width,
                        }}
                        label="Login"
                        labelStyle={{ color: '#609806' }}
                        onPress={() => {
                            props.navigation.navigate('Login');
                        }}
                    />
                </View>*/}
            </View>
        </DrawerContentScrollView>
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

/*
function CustomDrawerContent(props) {
    const width = useWindowDimensions().width * 0.3;

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.menuContainer}>
                <View
                    style={[
                        styles.menuItemsCard,
                        { backgroundColor: '#fff2df', width: width, height: width },
                    ]}>
                    <>
                        <View
                            style={[styles.circleContainer, { backgroundColor: '#FFC56F' }]}>
                            <Feather travel name="briefcase" size={25} color="#fbae41" />
                            <DrawerItem
                                label="Screen1"
                                labelStyle={{ color: '#fbae41', fontSize: 10 }}
                                onPress={() => {
                                    props.navigation.navigate('Screen1');
                                }}
                            />
                        </View>
                    </>
                    <DrawerItem
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: width,
                            height: width,
                        }}
                        label="Screen2"
                        labelStyle={{ color: '#609806' }}
                        onPress={() => {
                            props.navigation.navigate('Screen1');
                        }}
                    />
                </View>
                <View
                    style={[
                        styles.menuItemsCard,
                        { backgroundColor: '#EFFFD5', width: width, height: width },
                    ]}>
                    <View
                        style={[styles.circleContainer, { backgroundColor: '#b5ff39' }]}>
                        <Feather Medical name="briefcase" size={25} color="#609806" />
                    </View>

                    <DrawerItem
                        style={{
                            position: 'absolute',
                            left: 0,
                            width: width,
                            height: width,
                        }}
                        label="Screen2"
                        labelStyle={{ color: '#609806' }}
                        onPress={() => {
                            props.navigation.navigate('StackNav');
                        }}
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    );
}*/
