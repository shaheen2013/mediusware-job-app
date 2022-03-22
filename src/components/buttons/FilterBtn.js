import React from 'react';
import {Text, Colors, View} from "react-native-ui-lib";
import {Ionicons} from '@expo/vector-icons';

const FilterBtn = () => {
    return (
        <View
            backgroundColor={Colors.blue}
            style={{
                alignItems: 'center',
                height: 50,
                justifyContent: 'center',
                borderRadius: 10
            }}>
            <Ionicons name="filter" size={30} color="white"/>
        </View>
    );
};

export default FilterBtn;
