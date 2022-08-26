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


/* let validateLinkedin = /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/;
let validateGithub = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim;
let experience = /^[0-9][0-9]?$|^100$/; */
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
    // const [expSalary,setExpSalary] = useState("");
    // const [comment,setComment] = useState("");
    const [additionalFields,setAdditionalFields] = useState([singleJob?.additional_fields]);
    const [text, setText] = useState([]);
    const [errors,setErrors] = useState({
        expSalary:'',
        commment:'',
    });
    const [dErrors,setDErrors] = useState({});
    const [formData,setFormData] =useState({
        expSalary:'',
        comment:"",
    });

    let textArr = [];

    // console.log(singleJob?.additional_fields,"my additional Field....");

    //const [isToken,setIsToken] = useState('');
    useEffect(()=>{
        // console.log("token hitted.......")
        if(token?.length > 0){
            applyProcess();
        }
    },[token])

    //console.log(dErrors,'drrors in console...')


    useEffect(()=>{
        singleJob?.additional_fields?.map(field=> setDErrors((prev)=> {
           /*  if(field?.required === true){
                return {...prev,[field?.title?.split(" ").join("")]: true}
            }  */ 
            return {...prev,[field?.title?.split(" ").join("")]: false}
            
        }));
    },[singleJob?.additional_fields?.length])

  
    const handleChange = (value,text) => {
            setFormData({...formData,[value]:text})
            setErrors({...errors,[value]:""})
    }

    const handleSubmit = () =>{
        text.map(t => {
           Object.keys(t).forEach(key => {
             textArr.push(t[key]);
          })}
          )

          //console.log('text Arr..',textArr);
   
         // console.log('derrors',dErrors)

         let updatedError = {...dErrors};
        singleJob?.additional_fields?.forEach((field,i )=> {
            let regx = field?.validation_regx.split("/").join("\\/")
             //console.log(regx,'regx.....');
             if(field?.required){
                 updatedError = {...updatedError,[field.title.split(" ").join('')]:true};
                
               // setDErrors({...dErrors, [field.title.split(" ").join('')]:true})
               // console.log(dErrors,i,'d errors....')
             }
             setErrors({...updatedError})
            //  console.log(updatedError,'dErrors...')
            /*  if(field.required){
               
                
                 if(/regx/.test(text[i].field.title.split(" ").join('')) == false){
                    console.log( text[i],'it is false at now...')
                    setDErrors({...dErrors,[field.title.split(" ").join('')]:true});
                }else {
                    setDErrors({...dErrors,[field.title.split(" ").join('')]:false});
                } 
             }  */

               /*  if(regx?.test(text[i]) === undefined){
                    if(regx?.test(text[i]) === false){
                        console.log("error....")
                    }
                    console.log('undefined error...')
                } */
                
               /*  if(text[i] === undefined){
                    setErrors({...errors,[field?.title?.split(" ").join("")]:"Required"})
                }
                else if((regx?.test(text[i]) === false)){
                    setErrors({...errors,[field?.title?.split(" ").join("")]:"Invalid"})
                } 
            }*/ 
        });

        if(validateExpSalary.test(formData.expSalary) === false){
            setErrors({...errors,expSalary:"Invalid Expected Salary"})
            return;

        }
         
       
        if(token){
            applyProcess(true);
        }else{
            register(registerData,()=> {
                login(loginData,()=>{
                       applyProcess();

                });
            })
        }
    }


   

   /* apply(isToken,{
        job_slug,
        expected_salary: values.expSalary,
        additional_message: values.comment,
        additional_fields: text
    }, () => {
        navigation.navigate('Submission');
        clearErrorMsg();
        values.expSalary = "";
        values.comment = "";
    });*/



    const applyProcess = (initailValue=false) => {
        apply(token,{
            job_slug,
            expected_salary: formData.expSalary,
            additional_message: formData.comment,
            additional_fields: textArr
        }, () => {
            navigation.navigate('Submission');
            clearErrorMsg();
            formData.expSalary = "";
            formData.comment = "";
        },initailValue);
    }

    const salaryValidationColor = errors.expSalary ? '#FF5A5F' : Colors.borderColor;

    // const dynamicValidation color = 

    // const validationColor = !touched ? Colors.borderColor : errors?.expSalary ? '#FF5A5F' : Colors.borderColor;

   

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
                        <View>
                            <Text text gray marginB-20>If already have Mediusware job account then please <Text
                                onPress={() => navigation.navigate('Login')} blue>Login</Text></Text>
                        </View>

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
                                        //onChangeText={(text) => setFormData({...formData,expSalary:text})} 
                                         onChangeText={(text)=>handleChange('expSalary',text)}
                                        // onBlur={handleBlur('expSalary')}
                                        // error={errors.expSalary}
                                        // touched={touched.expSalary}
                                        /*value={expSalary}
                                        onChangeText={setExpSalary}*/
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
                                    <View style={{...styles.textInputField,borderColor:dErrors[field.title.split(" ").join('')] === true ? 'red' : Colors.borderColor}}>
                                        <TextInput
                                            autoComplete={"off"}
                                            autoCorrect={false}
                                            //value={text[index]}
                                            onChangeText={(t) => {
                                                
                                                setText((text) => {
                                                    // let regx = field?.validation_regx.split("/").join("\\/");
                                                    // /regx/.test(t) === false ? 
                                                    // (setDErrors({...dErrors,[field.title.split(" ").join('')]:true}))
                                                    // :
                                                    // (setDErrors({...dErrors,[field.title.split(" ").join('')]:false}))
                                                    //const obj = {[field.title.split(" ").join('')]:t}
                                                   // console.log(obj,'obj...')
                                                    // console.log(text,'text');

                                                   // const newObj = [...text,obj];
                                                    //console.log(newObj,'newObj...');
                                                    
                                                    //const newText = [...text,obj];
                                                    const newText = [...text];
                                                    newText[index] = {[field.title.split(" ").join('')]:t}
                                                    return newText;
                                                
                                                    // newText[index] = obj;
                                                     //console.log(newText,'newText.....')
                                                   // return newText;
                                                });
                                                
                                            //     field?.required && t.length === 0 ?  
                                            //    setDErrors({...dErrors,[field.title.split(" ").join('')]:true})
                                            //    :
                                            //    setDErrors({...dErrors,[field.title.split(" ").join('')]:false});

                                              // console.log(field?.validation_regx,'fjdksjfdklfj');
                                              
                                            
                                              
                                               
                                            }}
                                            style={{
                                                flex: 1,
                                                fontFamily: "Montserrat_400Regular",
                                            }}
                                        />
                                    </View>
                                   {/*  {field?.required  && (dErrors[index] === field.title.split(" ").join('')) ? (
                                    <Text style={{color: 'red'}} marginV-4 text>{"Invalid"}</Text>
                                    ) : (
                                        <></>
                                    )} */}

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
                                    //value={values.comments}
                                    //  onChangeText={handleChange('comment')}
                                    // onBlur={handleBlur('comment')}
                                    // error={errors.comment}
                                    // touched={touched.comment}
                                    multiline={true}
                                    numberOfLines={10}
                                    // onSubmitEditing={() => handleSubmit()}
                                   // value={comment}
                                   // onChangeText={setComment}
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
                    <TouchableOpacity flex-1 marginR-10 onPress={() => navigation.navigate('Apply',{title:title,job_slug:job_slug})}>
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
