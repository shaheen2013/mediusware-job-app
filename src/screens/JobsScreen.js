import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import FilterBtn from "../components/buttons/FilterBtn";
import SearchField from "../components/formComponents/SearchField";
import HeaderTitle from "../components/HeaderTitle";
import JobCard from "../components/JobCard";
import { Context as AuthContext } from "../contexts/AuthContext";
import { Context as UserContext } from "../contexts/UserContext";
import useJobs from "../hooks/useJobs";
function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar {...props} /> : <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>;
}



const JobsScreen = ({navigation}) => {
    const {state:{token},clearErrorMsg,tryLocalLogin,login}= useContext(AuthContext);
    const {state:{user},getUser} = useContext(UserContext);
    const date = new Date();
    const hours = date.getHours();
    const [jobs,isLoading,setIsLoading,onRefresh,refreshing] = useJobs();
    const [greetings,setGreetings] = useState('Good Morning');
    const [searchText,setSearchText] = useState("");
    const [jobList,setJobList] = useState([]);
    const [state, setState] = useState({});

   
    useEffect(()=>{
        setJobList(jobs);
    },[jobs.length])

    useEffect(()=>{
        tryLocalLogin().then(()=>getUser(token));
        return () => {
            setState({}); // This worked for me
          };
    },[token])

    useEffect(()=>{
        if(hours >=5 && hours <12){
            setGreetings('Good Morning');
        }
        if(hours >= 12 && hours< 18){
            setGreetings('Good Afternoon');
        }
        if(hours >= 18 || hours < 5) {
            setGreetings('Good Evening');
        }
    },[])

    const searchFilter = (text) =>{
        const filteredList = jobs.filter(job => {
            const jobTitle = job.title.toLowerCase();
            const userTypedText = text.toLowerCase();
            return jobTitle.indexOf(userTypedText) > -1;
        })
        setJobList(filteredList);
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <FocusAwareStatusBar barStyle='dark-content' backgroundColor={Colors.white}/>
            <View paddingH-16 flex-1>
                <HeaderTitle navigation={navigation}/>
                <Text marginT-20 marginB-6 caption gray>{!token && 'Hey, '} {greetings} {`${token && user?.user?.full_name?user?.user?.full_name.split(" ")[0]:""}!`}</Text>
                <View row marginB-10>
                    <Text subTitleText deepGray>Find Your</Text>
                    <Text subTitleText blue> Perfect Job</Text>
                </View>
                <View row>
                    <View flex-6 marginR-10>
                        <SearchField searchText={searchText} searchFilter={searchFilter}/>
                    </View>
                    <TouchableOpacity flex-1 disabled={true}>
                        <FilterBtn/>
                    </TouchableOpacity>
                </View>
                <Text marginV-10 subtitle1 deepGray>Mediusware Jobs</Text>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={[Colors.blue]}
                            refreshing={refreshing}
                            onRefresh={onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                    data={jobList}
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
