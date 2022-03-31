import React, {useState} from 'react';
import _ from 'lodash';
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

    const renderOne = () => {
        return (
            <View>
                <Text>This is Step One Page</Text>
            </View>
        );
    };

    const renderTwo = () => {
        return (
            <View>
                <Text>This is Step Two Page</Text>
            </View>
        );
    };

    const renderThree = () => {
        return (
            <View>
                <Text>This is Step Three Page</Text>
            </View>
        );
    };

    const renderFour = () => {
        return (
            <View>
                <Text>This is Step Four Page</Text>
            </View>
        );
    };

    const renderFive = () => {
        return (
            <View>
                <Text>This is Step Five Page</Text>
            </View>
        );
    };


    const renderCurrentStep = () => {
        switch (activeIndex) {
            case 0:
            default:
                return renderOne();
            case 1:
                return renderTwo();
            case 2:
                return renderThree();
            case 3:
                return renderFour();
            case 4:
                return renderFive();
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
        const defaultStyle = {borderWidth:5,borderColor:Colors.lightGray};
        const activeStyle = {borderWidth:5,borderColor:Colors.blue};
        return activeIndex >= index ? activeStyle:defaultStyle;
    }

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
                                     connectorStyle={{borderWidth:5,borderColor:Colors.lightGray}}
                                     color={Colors.white}
                                     circleBackgroundColor={setStepBg(0)}/>
                        <Wizard.Step state={getStepState(1)}
                                     connectorStyle={setConnectorStyle(1)}
                                     color={Colors.white}
                                     circleBackgroundColor={setStepBg(1)}/>
                        <Wizard.Step state={getStepState(2)}
                                     connectorStyle={setConnectorStyle(2)}
                                     color={Colors.white}
                                     circleBackgroundColor={setStepBg(2)}/>
                        <Wizard.Step state={getStepState(3)}
                                     connectorStyle={setConnectorStyle(3)}
                                     color={Colors.white}
                                     circleBackgroundColor={setStepBg(3)}/>
                        <Wizard.Step state={getStepState(4)}
                                     connectorStyle={setConnectorStyle(4)}
                                     color={Colors.white}
                                     circleBackgroundColor={setStepBg(4)}/>
                    </Wizard>
                    {renderCurrentStep()}
                </View>
                <View>

                </View>

            </View>


        </SafeAreaView>
    );
};

export default ExamProgress;
