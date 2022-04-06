import React from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import Point from "./Point";
const Pending = () => {
    return (
        <View marginT-20>
            <Point title={"Status"} text={"Pending"}/>
            <Point title={"Job Title"} text={"SENIOR SOFTWARE ENGINEER (PHP, Laravel)"}/>
            <Point title={"Applied at"} text={"10 Feb, 2022"}/>
            <Point title={"Exp. Salary"} text={"25,000"}/>
            <View row marginB-10>
                <Text flex-1 subtitle3 color={Colors.gray}>Note:</Text>
                <Text flex-3 text color={Colors.deepGray}>We have received your application and your application.
                    You have 3 Assessment to go with. Click on the assessment from the top process bar and then click start exam to start assessment. </Text>
            </View>
        </View>
    );
};

export default Pending;
