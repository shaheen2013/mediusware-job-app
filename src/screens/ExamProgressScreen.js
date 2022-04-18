import React, {useState} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import CommonHeader from "../components/CommonHeader";
import {
    Colors,
    TouchableOpacity,
    View,
    Wizard,
    Text,
    RadioGroup,
    RadioButton,
    TextField,
    ThemeManager
} from "react-native-ui-lib";
import InputField from "../components/formComponents/InputField";
import FilledBtn from "../components/buttons/FilledBtn";
import {SafeAreaView} from "react-native-safe-area-context";
import ProgressBtn from "../components/buttons/ProgressBtn";
import {getBackgroundColor} from "react-native/Libraries/LogBox/UI/LogBoxStyle";
import Pending from "../components/ExamProgress/Pending";
import Mcq from "../components/ExamProgress/Mcq";
import Written from "../components/ExamProgress/Written";
import Viva from "../components/ExamProgress/Viva";
import Result from "../components/ExamProgress/Result";


const ExamProgress = ({route, navigation}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [completedStepIndex, setCompletedStepIndex] = useState(undefined);
    const [allTypesIndex, setAllTypesIndex] = useState(0);

    const onActiveIndexChanged = (activeIndex) => {
        setActiveIndex(activeIndex);
        console.log(activeIndex);
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
                return <Pending/>;
            case 1:
                return <Mcq navigation={navigation}/>;
            case 2:
                return <Written navigation={navigation}/>;
            case 3:
                return <Viva navigation={navigation}/>;
            case 4:
                return <Result  navigation={navigation}/>;
        }
    };

    ThemeManager.setComponentTheme('Wizard', (props, context) => {
        //console.log(context);
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
                    <Text caption color={Colors.gray} marginT-20->Hello, Jack</Text>
                    {renderCurrentStep()}

                </View>


            </View>


        </SafeAreaView>
    );
};

export default ExamProgress;
