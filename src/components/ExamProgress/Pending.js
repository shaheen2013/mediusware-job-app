import React, {useEffect, useState} from 'react';
import {Colors, Text, View} from 'react-native-ui-lib';
import Point from "./Point";
import {ActivityIndicator} from "react-native";
import useCandidate from "../../hooks/useCandidate";
import useApply from "../../hooks/useApply";

const Pending = ({navigation,title,appliedAt,expSalary}) => {
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        if(title && appliedAt && expSalary){
            setIsLoading(false);
        }

    },[title,appliedAt,expSalary])
    return (
        <View marginT-20>
            {isLoading  ? <ActivityIndicator size={30} color={Colors.blue} style={{height: 30}}/>
            : <View>
                <Point title={"Status"} text={"Pending"}/>
                <Point title={"Job Title"} text={title}/>
                <Point title={"Applied at"} text={appliedAt}/>
                <Point title={"Exp. Salary"} text={expSalary}/>

                    <View row marginB-10>
                    <Text flex-1 subtitle3 color={Colors.gray}>Note:</Text>
                    <Text flex-3 text color={Colors.deepGray}>We have received your application and your
                        application.
                        You have 3 Assessment to go with. Click on the assessment from the top process bar and then
                        click start exam to start assessment. </Text>
                </View>
            </View>
            }

        </View>
    );
};

export default Pending;
