import React from 'react';
import {Text, View,Colors} from 'react-native-ui-lib';
const Point = ({title,text}) => {
    return (
            <View row marginB-10>
                <Text flex-1 subtitle3 color={Colors.gray}>{title}:</Text>
                <Text flex-3 subtitle3 color={Colors.blue} marginL-3>{text}</Text>
            </View>


    );
};

export default Point;