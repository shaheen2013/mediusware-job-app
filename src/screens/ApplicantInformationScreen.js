import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import {
    ScrollView, StatusBar,
    StyleSheet,
    TextInput
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Toast from 'react-native-toast-message';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import BlueOutlineBtn from "../components/buttons/BlueOutlineBtn";
import FilledBtn from "../components/buttons/FilledBtn";
import CommonHeader from "../components/CommonHeader";
import { Context as AuthContext } from "../contexts/AuthContext";
import useSingleJob from "../hooks/useSingleJob";

 
let validateExpSalary = /^(?:[0-9][0-9]{0,6}(?:\.\d{1,2})?|100000|100000.00)$/;

const toastConfig = {
    tomatoToast: ({ text1,props }) => (
        <View
            style={{ height: 120,
                backgroundColor: Colors.borderColor,
                borderRadius:10,
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                opacity:1,
                borderLeftWidth:5,
                borderLeftColor:Colors.warningColor,
                marginHorizontal:16,
                paddingHorizontal:16
            }}>
            <Ionicons name="warning" size={60} color={Colors.warningColor} />
            <Text subtitle1 warningColor>{text1}</Text>

        </View>
    )
};


const ApplicantInformationScreen = ({navigation, route}) => {
    const {state:{token,errorMessage,loader}, register, login, clearErrorMsg, apply} = useContext(AuthContext);
    const {title, job_slug,registerData,loginData} = route.params;
    const [singleJob,isLoading] = useSingleJob(job_slug);
    const isIcon = false;
    const [additionalFields,setAdditionalFields] = useState([singleJob?.additional_fields]);
    const [text, setText] = useState([]);
    const [textObj,setTextObj] = useState([]);
    const [errors,setErrors] = useState({
        expSalary:'',
        commment:'',
    });
    const [dErrors,setDErrors] = useState({});
    const [formData,setFormData] =useState({
        expSalary:'',
        comment:"",
    });
    const [tempError,setTempError] = useState(false);

    useEffect(()=>{
        if(token?.length > 0){
            applyProcess();
        }
    },[token])


    useEffect(()=>{
        singleJob?.additional_fields?.map(field=> setDErrors((prev)=> {
            console.log(field,'filed....')
            /* if(field?.required === true){
                return {...prev,[field?.title?.split(" ").join("")]: true}
            }  */ 
            return {...prev,[field?.title?.split(" ").join("")]: false}
            
        }));
    },[singleJob?.additional_fields?.length])

  
    const handleChange = (value,text) => {
            setFormData({...formData,[value]:text})
            setErrors({...errors,[value]:""})
    }

    const goBack = () =>{
        navigation.goBack();
    }

    const handleSubmit = () =>{
        console.log(text,'text ...')
         let updatedError = {...dErrors};
        
        singleJob?.additional_fields?.forEach((field,i )=> {
            if(field?.required === true){
                if(text.length === 0 || text[i] === undefined || text[i] === ''){
                    console.log('undefined...')
                    updatedError = {...updatedError,[field.title.split(" ").join('')]:true};
                    setTempError(true);
                }     
                            
            }else if(field?.required === false){
                if(text[i] === undefined){
                    text[i] = "";
                    updatedError = {...updatedError,[field.title.split(" ").join('')]:false};
                    setTempError(false);
                }
                    
            }
               
            setDErrors({...updatedError}) 

            console.log(errors, 'errors...')
 
        });
        console.log('derrors.....',dErrors);
        
        if(tempError === true){
            return;
        }
        //console.log(errors,'updated error...');
        if(formData.expSalary === ""){
            setErrors({...errors,expSalary:"Required Expected Salary"})
            return
        }

        if(validateExpSalary.test(formData.expSalary) === false){
            setErrors({...errors,expSalary:"Invalid Expected Salary"})
            return;

        }

        if(token && tempError == false){
            applyProcess(true);
        }else{
            register(registerData,()=> {
                login(loginData,()=>{
                       applyProcess();

                });
            })
        }
    }




    const applyProcess = (initailValue=false) => {
        console.log(text,'text.....')
        apply(token,{
            job_slug,
            expected_salary: formData.expSalary,
            additional_message: formData.comment,
            additional_fields: text
        }, () => {
            navigation.navigate('Submission',{title:title, job_slug:job_slug});
            clearErrorMsg();
            formData.expSalary = "";
            formData.comment = "";
        },initailValue);
    }

    const salaryValidationColor = errors.expSalary ? '#FF5A5F' : Colors.borderColor;

    useEffect(() => {
        showToast()
        clearErrorMsg();
    }, [errorMessage?.message])

    const showToast = () => {
        errorMessage?.message && Toast.show({
            type: 'tomatoToast',
            text1: ` ${errorMessage?.message}`
        })
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View flex-1>
                <CommonHeader name="Applicant Information" navigation={navigation}/>
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
            </View>

            <View paddingH-16 flex-12>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View flex-8>
                        <Text subtitle4 blue marginB-10>{title}</Text>
                        {!token && <View>
                            <Text text gray marginB-20>If already have Mediusware job account then please <Text
                                onPress={() => navigation.navigate('Login')} blue>Login</Text></Text>
                        </View>}

                        <View marginB-16>
                            <Text marginB-8 text>What is your expected salary?*</Text>
                            <View row>
                                <View style={{...styles.currencyContainer,borderColor:salaryValidationColor}}>
                                    <Text>BDT</Text>
                                </View>
                                <View style={{...styles.salaryContainer,borderColor:salaryValidationColor}}>
                                    <TextInput
                                        keyboardType="numeric"
                                        autoCapitalize={"none"}
                                        autoCorrect={false}
                                        autoComplete={"off"}
                                        value={formData.expSalary}
                                         onChangeText={(text)=>handleChange('expSalary',text)}
                                        style={{
                                            fontFamily: "Montserrat_400Regular",
                                        }}
                                        placeholder={"Enter Your Expected Salary"}
                                    />
                                </View>
                            </View>
                            {errors.expSalary ? (
                                <Text style={{color: 'red'}} marginV-4 text>{errors.expSalary}</Text>
                            ) : (
                                <></>
                            )}
                        </View>


                        {
                            isLoading ?
                            (<View  style={{ marginTop:16}}>
                                <ShimmerPlaceHolder
                                LinearGradient={LinearGradient}
                                height={20}
                                isReversed={true}
                                width={180}
                                >
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder
                                style={{marginTop:8}}
                                LinearGradient={LinearGradient}
                                height={40}
                                isReversed={true}
                                width={380}
                                >
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder
                                style={{ marginTop:16}}
                                LinearGradient={LinearGradient}
                                height={20}
                                isReversed={true}
                                width={180}
                                >
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder
                                style={{marginTop:8}}
                                LinearGradient={LinearGradient}
                                height={40}
                                isReversed={true}
                                width={380}
                                >
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder
                                style={{ marginTop:16}}
                                LinearGradient={LinearGradient}
                                height={20}
                                isReversed={true}
                                width={180}
                                >
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder
                                style={{marginTop:8}}
                                LinearGradient={LinearGradient}
                                height={40}
                                isReversed={true}
                                width={380}
                                >
                                </ShimmerPlaceHolder>
                            </View>)
                            :
                          singleJob?.additional_fields?.map((field,index)=>(
                                <View key={index}>
                                    <Text marginV-8 text>{`${field?.title} ${field?.required ? '*':''}`}</Text>
                                    <View style={{...styles.textInputField,borderColor:dErrors[field.title.split(" ").join('')] === true?'red':Colors.borderColor}}>
                                        <TextInput
                                            autoComplete={"off"}
                                            autoCorrect={false}

                                            onChangeText={(t) => {
                                                
                                                setText((text) => {
                                                    const newText = [...text];
                                                    textObj[index] = {[field.title.split(" ").join('')]:t}
                                                    newText[index] = t;
                                                    return newText;
                                                });

                                               let regxE = new RegExp(field?.validation_regx, "i");
                                               console.log(regxE,'regx...')
                                               if(regxE.test(t) === true){
                                                        setDErrors({...dErrors,[field.title.split(" ").join('')]:false})
                                                        setTempError(false);
                                               }else if(regxE.test(t) === false){
                                                    setDErrors({...dErrors,[field.title.split(" ").join('')]:true})
                                                    setTempError(true);         
                                                }

                                                console.log('text',text)

                                                if(field.required === true){
                                                    if(t === ""){
                                                        setDErrors({...dErrors,[field.title.split(" ").join('')]:true})
                                                        setTempError(true);
                                                    }
                                                }

                                                if(field.required === false){
                                                    if(t === ""){
                                                        setDErrors({...dErrors,[field.title.split(" ").join('')]:false})
                                                        setTempError(false);
                                                    }
                                                }

                                            }}
                                            style={{
                                                flex: 1,
                                                fontFamily: "Montserrat_400Regular",
                                            }}
                                        />
                                    </View>
                                    {dErrors[field.title.split(" ").join('')] === true ? 
                                    (text[index] !== undefined ) ?
                                    (
                                     <Text style={{color: 'red'}} marginV-4 text>{`Invalid ${field.title}`}</Text>
                                    ): 
                                    (
                                     <Text style={{color: 'red'}} marginV-4 text>{`Requried ${field.title}`}</Text>
                                    ): (
                                        <></>
                                    )}

                                </View>
                            ))

                        }
                        <View>
                            <Text marginV-8 text>Do you have anything to say to us?</Text>
                            <View style={{...styles.textInputStyle,borderColor:Colors.borderColor}}>
                                <TextInput
                                    keyboardType="email-address"
                                    autoComplete={"off"}
                                    autoCorrect={false}
                                    multiline={true}
                                    numberOfLines={10}
                                    style={{
                                        textAlignVertical: 'top',
                                        fontFamily: 'Montserrat_400Regular'
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Toast
                    config={toastConfig}
                    visibilityTime={5000}
                    position='top'
                />
                <View row marginV-15>
                    <TouchableOpacity flex-1 marginR-10 onPress={goBack}>
                        <BlueOutlineBtn title={'Back'}/>
                    </TouchableOpacity>
                    <TouchableOpacity flex-1 disabled={loader} onPress={handleSubmit} >
                        <FilledBtn title={'Submit'} isLoading={loader}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInputStyle: {
        borderRadius: 10,
        borderWidth: 1,
        height: 100,
        paddingHorizontal: 16,
        marginBottom: 7,
    },
    currencyContainer: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    salaryContainer: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderLeftWidth: 0,
        height: 48,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flex: 6
    },
    textInputField:{
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        paddingHorizontal: 16,
        marginBottom: 7,
    }
})


export default ApplicantInformationScreen;
