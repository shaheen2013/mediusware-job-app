import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, StatusBar, StyleSheet,Button} from 'react-native';
import {Text, View, TouchableOpacity, Colors} from 'react-native-ui-lib';
import HeaderTitle from "../components/HeaderTitle";
import SearchField from "../components/formComponents/SearchField";
import FilterBtn from "../components/buttons/FilterBtn";
import JobCard from "../components/JobCard";
import useJobs from "../hooks/useJobs";
import {Context as AuthContext} from "../contexts/AuthContext";
import useCandidate from "../hooks/useCandidate";
import {useIsFocused} from "@react-navigation/native";
function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}
const JobsScreen = ({navigation}) => {
    const {state,clearErrorMsg}= useContext(AuthContext);
    const date = new Date();
    const hours = date.getHours();
    console.log(hours);
    const [jobs,isLoading,setIsLoading] = useJobs();
    const [greetings,setGreetings] = useState('Good Morning');
    const [user] = useCandidate();


    useEffect(()=>{
        if(hours >=5 && hours <12){
            setGreetings('Good Morning');
        }
        if(hours >= 12 && hours< 14){
            setGreetings('Good Noon');
        }
        if(hours >= 14 && hours< 18){
            setGreetings('Good Afternoon');
        }
        if(hours >= 19 || hours < 5) {
            setGreetings('Good Night');
        }
        if(hours >=18 && hours < 19){
            setGreetings('Good Evening');
        }
    },[])

    return (
        <SafeAreaView style={{flex: 1}}>
            <FocusAwareStatusBar barStyle='dark-content' backgroundColor={Colors.white}/>
            <View paddingH-16 flex-1>
                <HeaderTitle navigation={navigation}/>
                <Text marginT-20 marginB-6 caption gray>{!state?.token && 'Hey, '} {greetings} {`${ state?.token && user?.full_name?user?.full_name.split(" ")[0]:""}!`}</Text>
                <View row marginB-10>
                    <Text subTitleText deepGray>Find Your</Text>
                    <Text subTitleText blue> Perfect Job</Text>
                </View>
                <View row>
                    <View flex-6 marginR-10>
                        <SearchField/>
                    </View>
                    <TouchableOpacity flex-1>
                        <FilterBtn/>
                    </TouchableOpacity>
                </View>
                <Text marginV-10 subtitle1 deepGray>Mediusware Jobs</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={jobs}
                    keyExtractor={(item)=> item.title}
                    //keyExtractor={(item,index)=> item.key}
                    renderItem={({item}) => {
                        return <JobCard
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            job={item}
                            navigation={navigation}
                        />
                    }}/>

            </View>
        </SafeAreaView>
    );
};

export default JobsScreen;


//fontFamily:'Montserrat_800ExtraBold'