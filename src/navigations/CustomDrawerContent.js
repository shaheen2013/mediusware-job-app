import React from 'react';
import { Feather,MaterialCommunityIcons  } from '@expo/vector-icons';
import {useWindowDimensions, StyleSheet} from 'react-native';
import {Colors,Text, View, TouchableOpacity} from 'react-native-ui-lib'
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import MediuswareIcon from "../../assets/svgIcon/MediuswareIcon";


const CustomDrawerContent = (props) => {
    //const width = useWindowDimensions().width * 0.3;
    return (
        <DrawerContentScrollView {...props} style={{backgroundColor:'#F3F7FB',paddingHorizontal:16}}>
            <View>
                <View>
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
                        <View style={styles.userIconStyle}>
                            <Feather name="user" size={36} color="black"/>
                        </View>
                        <View marginL-10>
                            <Text style={{fontSize:20,fontFamily:'Montserrat_500Medium'}}>Guest User</Text>
                            <TouchableOpacity onPress={()=> props.navigation.navigate('Login')}>
                                <View style={{paddingVertical:5,flexDirection:'row'}}>
                                    <Text style={{color:'blue',fontFamily:'Montserrat_500Medium',marginRight:5}}>Login</Text>
                                    <MaterialCommunityIcons name="login" size={24} color="blue" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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

