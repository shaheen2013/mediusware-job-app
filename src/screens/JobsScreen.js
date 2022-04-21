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


const JobsScreen = ({navigation}) => {
    const [jobs] = useJobs();
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
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