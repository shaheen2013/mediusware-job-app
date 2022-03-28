import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {Colors, Text, View} from 'react-native-ui-lib';
import {FlatList} from "react-native";
import JobCard from "../JobCard";
import JobResponsibilityBulletPoint from "./JobResponsiblityBulletPoint";

const JobResponsibility = ({points, title, value}) => {
    return (
        <View paddingH-16>
            <Text subtitle1 deepGray marginB-16>{title}:</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                listKey={value}
                data={points}
                keyExtractor={(item) => item}
                renderItem={({item}) => {
                    return <JobResponsibilityBulletPoint item={item}
                    />
                }}/>
        </View>
    );
};

export default JobResponsibility;
