import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useFormik } from 'formik';
import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import * as Yup from 'yup';
import FilledBtn from "../components/buttons/FilledBtn";
import CommonHeader from "../components/CommonHeader";
import InputField from "../components/formComponents/InputField";
import { Context as AuthContext } from "../contexts/AuthContext";

const ApplyScreen = ({ navigation, route }) => {
  const { state, register, login, apply, clearErrorMsg } =
    useContext(AuthContext);
  console.log("Apply: ",state.errorMessage);
  const { title, job_slug } = route.params;
  const isIcon = false;
  const [cv, setCv] = useState({});
  const [totalFormDataObj, setTotalFormDataObj] = useState(new FormData());
  let formDataObj = new FormData();
  const [errorMsg, setErrorMsg] = useState("");
  const password = useRef(null);
  const email = useRef(null);
  const rePassword = useRef(null);
  const phone = useRef(null);

  let phoneRegExp = /^[0-9]{10}$/;
  let nameRegExp = /^[a-zA-Z\s\.]+$/g;
  const registrationSchema = Yup.object().shape({
    full_name:Yup.string().matches(nameRegExp, 'Name is not valid').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
    password: Yup.string()
        .min(6, 'Must be 6 character Long!')
        .required('Required'),
    rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must be matched').required('Required'),
    file: Yup.mixed().required('File  Required')
  });

  const toastConfig = {
    tomatoToast: ({ text1,props }) => (
        <View
            style={{ height: 80,
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
            <Ionicons name="warning" size={40} color={Colors.warningColor} />
            <Text subtitle1 warningColor>{text1}</Text>

        </View>
    )
  };

  const{
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched
  } = useFormik({
    validationSchema: registrationSchema,
    initialValues: {full_name:'', email: '',phone:'', password: '',rePassword:'',file:null},
    onSubmit: (values) =>{
      formDataObj = totalFormDataObj;
      console.log("file:",values.file);
      let formData = {
        full_name:values.full_name,
        phone:values.phone,
        email:values.email,
        password:values.password,
      };
      for (let key in formData) {
        formDataObj.append(
            key,
            Array.isArray(formData[key])
                ? JSON.stringify(formData[key])
                : formData[key]
        );
      }
      console.log(formDataObj , 'formDataObj apply');
      navigation.navigate('ApplicantInformation',{title:title,job_slug:job_slug,registerData:formDataObj,loginData:{email:values.email, password:values.password}});

    }
  });

  useEffect(() => {
    showToast()
    clearErrorMsg();
  }, [state?.errorMessage?.email,state?.errorMessage?.phone])


  const showToast = () => {
    if(state?.errorMessage?.email && state?.errorMessage?.phone){
      Toast.show({
        type: 'tomatoToast',
        text1: 'Candidate with this email address and phone number Already Exists',
      })
    }
    else if(state?.errorMessage?.email && !state?.errorMessage?.phone){
      Toast.show({
        type: 'tomatoToast',
        text1: 'Candidate with this email address Already Exists',
      })
    }
    else if(state?.errorMessage?.phone && !state?.errorMessage?.email){
      Toast.show({
        type: 'tomatoToast',
        text1: ` Candidate with this phone number  Already Exists`,
      })
    }

  }

  const phoneValidateColor = !touched ? Colors.borderColor : errors?.phone ? '#FF5A5F' : Colors.borderColor;
  const cvValidateColor = !touched ? Colors.borderColor : errors?.file ? '#FF5A5F' : Colors.borderColor;
  // Document Picker Expo
  const pickDocument = async (handleChange) => {
    let result = await DocumentPicker.getDocumentAsync({type: "application/*" });
    if (result.type !== "cancel") {
      handleChange(result.uri);
      const { name, uri } = result;
      const uriParts = name.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formDataObj.append("cv", {
        uri,
        name,
        type: `application/${fileType}`,
      });

      values.file=formDataObj;
      setCv(result);
    }
    setTotalFormDataObj(formDataObj);
  };
  return (
      <SafeAreaView style={{flex: 1}}>
        <View flex-1>
          <CommonHeader name={"Apply"} navigation={navigation}/>
          <StatusBar backgroundColor={Colors.white} barStyle='dark-content'/>
        </View>
        <View paddingH-16 flex-12>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View flex-8>
              <Text subtitle4 blue marginB-10>{title}</Text>
              <View>
                <Text text gray marginB-20>If already have Mediusware job account then please <Text
                    onPress={() => navigation.navigate('LoginStackNavigation',{screen:'Login'})} blue>Login</Text></Text>
              </View>
              <InputField
                  title={"Full Name*"}
                  placeholderText={"Enter Your Name"}
                  autoCapitalize={"words"}
                  keyboardType={'email-address'}
                  autoComplete={"off"}
                  autoCorrect={false}
                  spellCheck={false}
                  value={values.full_name}
                  onChangeText={handleChange('full_name')}
                  onBlur={handleBlur('full_name')}
                  error={errors.full_name}
                  touched={touched.full_name}
                  onSubmitEditing={() => email.current?.focus()}
              />

              <InputField
                  ref={email}
                  autoComplete={'email'}
                  keyboardType={'email-address'}
                  title={'Email Address'}
                  placeholderText={'email@email.com'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  autoCapitalize={"none"}
                  onSubmitEditing={() => phone.current?.focus()}
              />

              <View marginV-8>
                <Text marginB-8 text>
                  Phone Number
                </Text>
                <View row>
                  <View style={{...styles.phoneContainer, borderColor: phoneValidateColor,flexDirection:'column',justifyContent:'center'}}>
                    <Text text lightGray>+880</Text>
                  </View>
                  <View style={{...styles.phoneNumberContainer,borderColor:phoneValidateColor,flexDirection:'column',justifyContent:'center'}}>
                    <TextInput
                        ref={phone}
                        keyboardType={"phone-pad"}
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        touched={touched.phone}
                        onSubmitEditing={() => password.current?.focus()}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        style={{
                          fontFamily: "Montserrat_400Regular",
                          fontSize:14,
                        }}
                    />
                  </View>
                </View>
                {errors.phone ? (
                    <Text style={{color: 'red'}} marginV-4 text>{errors.phone}</Text>
                ) : (
                    <></>
                )}
              </View>

              <InputField
                  ref={password}
                  isIcon={true}
                  title={'Password'}
                  placeholderText={'Enter Your Password'}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                  autoCapitalize={"none"}
                  onSubmitEditing={() => handleSubmit()}
              />

              <InputField
                  ref={rePassword}
                  isIcon={true}
                  title={'Re-Type Password'}
                  placeholderText={'Enter Your Re-Type Password'}
                  value={values.rePassword}
                  onChangeText={handleChange('rePassword')}
                  onBlur={handleBlur('rePassword')}
                  error={errors.rePassword}
                  touched={touched.rePassword}
                  autoCapitalize={"none"}
                  onSubmitEditing={() => handleSubmit()}
              />
              <View>
                <Text marginB-8 text>
                  CV/Resume*
                </Text>
                <View style={{...styles.uploadContainer,borderColor: cvValidateColor}}>
                  <View style={styles.uploadStyle}>
                    <TouchableOpacity paddingH-8 paddingV-4
                                      onPress={()=>pickDocument(handleChange('file'))}
                                      touched={touched.file}
                                      error={errors.file}
                                      onChangeText={handleChange('file')}
                                      onBlur={handleBlur('file')}
                    >
                      <Text blue subtitle3>
                        Choose File
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.fileNameStyle} paddingH-10 paddingV-4>
                    <Text>{cv?.name}</Text>
                  </View>
                </View>
                {errors?.file? (
                    <Text style={{color: 'red'}} marginV-4 text>{errors.file}</Text>
                ) : (
                    <></>
                )}
              </View>
            </View>
          </ScrollView>

          <Toast
              config={toastConfig}
              visibilityTime={3000}
              position='top'
          />

          <TouchableOpacity marginV-15 disabled={state?.loader} onPress={()=>{
            handleSubmit()
          }}>
            {/*<TouchableOpacity marginV-15 onPress={registration}>*/}
            <FilledBtn title={"Continue"} isLoading={state?.loader}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    borderRadius: 10,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 7,
    position: "relative",
  },
  uploadStyle: {
    borderColor: "#E9E9E9",
    height: 32,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 10,
    alignSelf:'flex-start',
  },
  fileNameStyle: {
    position: "absolute",
    marginLeft: "40%",
  },
  phoneContainer: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    borderRightWidth: 0,
    height: 48,
    textAlign:'center',
    paddingLeft: 16,
    paddingRight:0,
  },
  phoneNumberContainer: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    height: 48,
    textAlign:'center',
    paddingRight: 16,
    paddingLeft:0,
    flex: 6,
  },
  mobileInputStyle:{
    
  }
});

export default ApplyScreen;
