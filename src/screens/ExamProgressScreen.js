import React, { useContext, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Colors, Text, ThemeManager, View,
    Wizard
} from "react-native-ui-lib";
import CommonHeader from "../components/CommonHeader";
import Mcq from "../components/ExamProgress/Mcq";
import Pending from "../components/ExamProgress/Pending";
import Result from "../components/ExamProgress/Result";
import Viva from "../components/ExamProgress/Viva";
import Written from "../components/ExamProgress/Written";
import { Context as AssessmentContext } from "../contexts/AssessmentContext";
import { Context as UserContext } from "../contexts/UserContext";
import useApply from "../hooks/useApply";


const ExamProgress = ({route, navigation}) => {
    const {state:{user}} = useContext(UserContext);
    const {state:{assessment,errorMsg}} = useContext(AssessmentContext);
    const [apply,loader,refreshing,onRefresh] = useApply();
    const {id} = route.params;
    const [activeIndex, setActiveIndex] = useState(0);
    const [completedStepIndex, setCompletedStepIndex] = useState(undefined);
    const [allTypesIndex, setAllTypesIndex] = useState(0);
    let singleApply;
    if(apply.length !==0){
         singleApply = apply.find(app => app.unique_id === id);
    }



    const onActiveIndexChanged = (activeIndex) => {
        setActiveIndex(activeIndex);
    }

    const activeIndexChanged = (activeIndex) => {
        setActiveIndex(activeIndex + 1);
    }

    const onAllTypesIndexChanged = (allTypesIndex) => {
        setAllTypesIndex(allTypesIndex);
    };

    const getStepState = (index) => {
        let state = Wizard.States.ENABLED;
        if (completedStepIndex > index + 1) {
            state = Wizard.States.COMPLETED;
        } else if (activeIndex === index || completedStepIndex === index - 1) {
            state = Wizard.States.ENABLED;
        }

        return state;
    }



    const renderCurrentStep = () => {
        switch (activeIndex) {
            case 0:
            default:
                return <Pending
                    navigation={navigation}
                    title={singleApply?.job?.title}
                    appliedAt={singleApply?.created_at}
                    expSalary={singleApply?.expected_salary}
                />;
            case 1:
                return <Mcq
                     navigation={navigation}
                     title={singleApply?.job?.title}
                     time={singleApply?.candidate_assessment && singleApply?.candidate_assessment[0]?.assessment?.duration}
                     score={singleApply?.candidate_assessment && singleApply?.candidate_assessment[0]?.score}
                     id={singleApply?.candidate_assessment && singleApply?.candidate_assessment[0]?.unique_id}
                     //goNextPage={goNextPage}
                />;
            case 2:
                return <Written
                    navigation={navigation}
                    title={singleApply?.job?.title}
                    time={singleApply?.candidate_assessment && singleApply?.candidate_assessment[1]?.assessment?.duration}
                    score={singleApply?.candidate_assessment && singleApply?.candidate_assessment[1]?.score}
                    id={singleApply?.candidate_assessment && singleApply?.candidate_assessment[1]?.unique_id}
                />;
            case 3:
                 return <Viva 
                navigation={navigation} title={apply?.job?.title}

                />;
            case 4:
                return <Result  
                navigation={navigation} title={apply?.job?.title}

                />;
        }
    };

    ThemeManager.setComponentTheme('Wizard', (props, context) => {
    });

    const setStepBg = (index) =>{
       return  activeIndex >= index ? Colors.blue : Colors.lightGray
    }
    const setLabel = (index) =>{
        return  activeIndex >= index ? index+1 : ''
    }


    const setConnectorStyle = (index) =>{
        const defaultStyle = {borderWidth:5,borderColor:Colors.borderColor,borderRadius:5,width:'1.5%'};
        const activeStyle = {borderWidth:5,borderColor:Colors.blue,borderRadius:5};
        return activeIndex >= index ? activeStyle:defaultStyle;
    }

    const indexlabelColor = (index) =>{
        const defaultColor = {color: Colors.lightGray};
        const activeColor  = {color: Colors.white};
        return activeIndex >= index ? activeColor: defaultColor;
    }

    const updateLabelText = (index) =>{
        const activeStyle={color:Colors.blue};
        const defaultStyle={color:Colors.blackGray};
        return activeIndex >= index ? activeStyle: defaultStyle;
    }

    let indexLabelStyle = indexlabelColor;
    return (
        <SafeAreaView style={{flex: 1}}>
            <View flex-1>
                <CommonHeader name={"Exam Progress"} navigation={navigation}/>
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            </View>
            <View paddingH-16 flex-12>
                <View>
                    <Wizard activeIndex={activeIndex} onActiveIndexChanged={onActiveIndexChanged} containerStyle={{
                        shadowColor: 'none',
                        backgroundColor: 'transparent',
                        shadowOffset: {width: 0, height: 0}
                    }}>
                            <Wizard.Step state={getStepState(0)}
                                         labelStyle={{color:Colors.primary}}
                                         indexLabelStyle={indexlabelColor(0)}
                                         connectorStyle={setConnectorStyle(0)}
                                         circleBackgroundColor={setStepBg(0)}
                            />

                        <Wizard.Step state={getStepState(1)}
                                     indexLabelStyle={indexlabelColor(1)}
                                     connectorStyle={setConnectorStyle(1)}
                                     color={Colors.white}
                                     circleBackgroundColor={setStepBg(1)}/>
                        <Wizard.Step state={getStepState(2)}
                                     indexLabelStyle={indexlabelColor(2)}
                                     connectorStyle={setConnectorStyle(2)}
                                     color={Colors.white}
                                     circleBackgroundColor={setStepBg(2)}/>
                        <Wizard.Step state={getStepState(3)}
                                     indexLabelStyle={indexlabelColor(3)}
                                     connectorStyle={setConnectorStyle(3)}
                                     color={Colors.white}
                                     circleBackgroundColor={setStepBg(3)}/>
                        <Wizard.Step state={getStepState(4)}
                                     indexLabelStyle={indexlabelColor(4)}
                                     connectorStyle={setConnectorStyle(4)}
                                     color={Colors.white}
                                     circleBackgroundColor={setStepBg(4)}/>
                        </Wizard>
                        <View row>
                            <Text text style={updateLabelText(0)}>Pending</Text>
                            <Text marginH-16 text style={updateLabelText(1)}>MCQ</Text>
                            <Text marginH-16 text style={updateLabelText(2)}>Written</Text>
                            <Text marginH-16 text style={updateLabelText(3)}>Viva</Text>
                            <Text marginH-16 text style={updateLabelText(4)}>Result</Text>
                        </View>
                    <Text caption color={Colors.gray} marginT-20->Hello, {user?.user?.full_name ? user?.user?.full_name.split(' ')[0]:'Jack'}</Text>
                    {renderCurrentStep()}

                </View>


            </View>


        </SafeAreaView>
    );
};

export default ExamProgress;
