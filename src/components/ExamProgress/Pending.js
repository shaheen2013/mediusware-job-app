import React from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import Point from "./Point";
import {ActivityIndicator} from "react-native";
import useCandidate from "../../hooks/useCandidate";
import useApply from "../../hooks/useApply";
const Pending = () => {
    const [apply,loader] = useApply();
    console.log('loader: ',loader);
    return (
        <View marginT-20>
            <Point title={"Status"} text={"Pending"}/>
            {
                loader? <ActivityIndicator size={30} color={Colors.borderColor} style={{height: 30}}/>
                :<View>
                    <Point title={"Job Title"} text={apply?.job?.title}/>
                    <Point title={"Applied at"} text={apply?.created_at}/>
                    <Point title={"Exp. Salary"} text={apply?.expected_salary}/>
                </View>
            }

            <View row marginB-10>
                <Text flex-1 subtitle3 color={Colors.gray}>Note:</Text>
                <Text flex-3 text color={Colors.deepGray}>We have received your application and your application.
                    You have 3 Assessment to go with. Click on the assessment from the top process bar and then click start exam to start assessment. </Text>
            </View>
        </View>
    );
};

export default Pending;
