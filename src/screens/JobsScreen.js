import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, StatusBar, StyleSheet,Button} from 'react-native';
import {Text, View, TouchableOpacity, Colors} from 'react-native-ui-lib';
import Logo from "../../assets/svgIcon/Logo";
import HeaderTitle from "../components/HeaderTitle";
import SearchField from "../components/formComponents/SearchField";
import FilterBtn from "../components/buttons/FilterBtn";
import JobCard from "../components/JobCard";
import useJobs from "../hooks/useJobs";


/*const jobs = [{
    id: 101,
    title: 'SENIOR SOFTWARE ENGINEER (PHP, Laravel)',
    salary: 'Tk. 25,000 - 45,000',
    experience: '2 Year of experience'
}, {
    id: 102,
    title: 'JUNIOR SOFTWARE ENGINEER (PHP, Laravel)',
    salary: 'Tk. 10,000 - 25,000',
    experience: '0-1 Year of experience'
}, {
    id: 103,
    title: 'JUNIOR SOFTWARE ENGINEER (PYTHON, DJANGO)',
    salary: 'Tk. 10,000 - 25,000',
    experience: '0-1 Year of experience'
}, {
    id: 104,
    title: 'SENIOR SOFTWARE ENGINEER (PYTHON, DJANGO)',
    salary: 'Tk. 25,000 - 45,000',
    experience: '2 Year of experience'
}, {
    id: 105,
    title: 'SENIOR SOFTWARE ENGINEER (PHP, Laravel)',
    salary: 'Tk. 25,000 - 45,000',
    experience: '2 Year of experience'
},]*/

const JobsScreen = ({navigation}) => {
    const [jobs] = useJobs();
    return (
        <SafeAreaView style={{flex: 1}}>

            <View paddingH-16 flex-1>
                <HeaderTitle navigation={navigation}/>
                <Text marginT-20 marginB-6 caption gray>Hey, Good Morning!</Text>
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