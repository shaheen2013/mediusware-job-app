import * as DocumentPicker from "expo-document-picker";
import React, {useContext, useRef, useState} from "react";
import {ScrollView, StatusBar, StyleSheet, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import FilledBtn from "../components/buttons/FilledBtn";
import CommonHeader from "../components/CommonHeader";
import { Context as AuthContext } from "../contexts/AuthContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from "../components/formComponents/InputField";

let phoneRegExp = /^[0-9]{10}$/;
const registrationSchema = Yup.object().shape({
  full_name:Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
  password: Yup.string()
      .min(6, 'Password should be at least 6 character long!')
      .required('Required'),
  rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});

const ApplyScreen = ({ navigation, route }) => {
  const { state, register, login, apply, clearErrorMsg } =
    useContext(AuthContext);
    //clearErrorMsg();
  const { title, job_slug } = route.params;
  const isIcon = false;
  const [cv, setCv] = useState({});
  const [isRegister, setIsRegister] = useState(true);
  const [expSalary, setExpSalary] = useState("");
  const [gitUrl, setGitUrl] = useState("");
  const [experience, setExperience] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [comments, setComments] = useState("");
  const [totalFormDataObj, setTotalFormDataObj] = useState(new FormData());
  let formDataObj = new FormData();
  //const [error, setError] = useState("");
  const password = useRef(null);
  const email = useRef(null);
  const rePassword = useRef(null);
  const phone = useRef(null);
  const{
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched
  } = useFormik({
    validationSchema: registrationSchema,
    initialValues: {full_name:'', email: '',phone:'', password: '',rePassword:''},
    onSubmit: (values) =>{
     console.log(values);
    }
  });

  const validationColor = !touched ? Colors.borderColor : errors?.phone ? '#FF5A5F' : Colors.borderColor;
  // Document Picker Expo
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({type: "application/*" });
    console.log(result);
    //setResume(result);
    if (result.type !== "cancel") {
      const { name, uri } = result;
      const uriParts = name.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formDataObj.append("cv", {
        uri,
        name,
        type: `application/${fileType}`,
      });
      setCv(result);
    }

    console.log("before: ", totalFormDataObj);
    setTotalFormDataObj(formDataObj);
    // console.log("after: ",totalFormDataObj);
    //console.log(formDataObj);
  };

  /*const validateEmail = (email) => {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);
  };*/

  /*const registration = () => {
   /!* if (totalFormDataObj._parts.length < 1) {
      let msg = {...errorMsg}
      msg.cvError = 'Please, Upload your CV!!!';
      setErrorMsg(msg);
    }*!/
    formDataObj = totalFormDataObj;
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
    }*/

    //register(formDataObj, () => registerSuccess());
    //register(formDataObj);
   /* const registerSuccess = () => {
      login({ email, password });
      console.log("state: ", state);
      clearErrorMsg();
      console.log("after state: ", state);
      setIsRegister(false);
      setTotalFormDataObj(new FormData());
      // clear all data
     setFull_name("");
     setEmail("");
     setPhone("");
     setPassword("");
     setRePassword("");
     setCv({});

    };*/
  //};

  /*const validateLinkedin = (linkedinProfile) => {
    return linkedinProfile.match(
      /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/
    );
  };
  const validateGithub = (githubProfile) => {
    return githubProfile.match(
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim
    );
  };*/

  const submit = () => {
    /*if (expSalary === "") {
      setError("expSalary");
      setErrorMsg("Please, Enter your expected salary!!!");
      return;
    }
    if (expSalary === "") {
      setError("experience");
      setErrorMsg("Please, Enter your professional experience years!!!");
      return;
    }
    if (!validateGithub(gitUrl)) {
      setError("github");
      setErrorMsg("Github Profile link is not valid!!!");
      return;
    }

    if (!validateLinkedin(linkedin)) {
      setError("linkedin");
      setErrorMsg("Linked profile is not valid!!!");
      return;
    }
*/
    // setError("");
    // setErrorMsg("");
    /*const successApply = () =>{
        navigation.navigate("Submission");
      
        setComments("");
        setGitUrl("");
        setLinkedin("");
        setExpSalary("");
        setExperience("");
    }*/
    //setAdditionalFields([gitUrl,5,linkedin]);
   /* apply(
      {
        job_slug,
        expected_salary: expSalary,
        additional_message: comments,
        additional_fields: [gitUrl, experience, linkedin],
      },
      () => successApply()
    );*/
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
                    onPress={() => navigation.navigate('Login')} blue>Login</Text></Text>
              </View>
              <InputField
                  title={"Full Name*"}
                  placeholderText={"Enter Your Name"}
                  value={values.full_name}
                  onChangeText={handleChange('full_name')}
                  onBlur={handleBlur('full_name')}
                  error={errors.full_name}
                  touched={touched.full_name}
                  onSubmitEditing={() => email.current?.focus()}
              />

              <InputField
                  ref={email}
                  autoCompleteType={'email'}
                  keyboardType={'email-address'}
                  title={'Email Address'}
                  placeholderText={'email@email.com'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  onSubmitEditing={() => phone.current?.focus()}
              />

              <View marginV-8>
                <Text marginB-8 text>
                  Phone Number
                </Text>
                <View row>
                  <View style={{...styles.phoneContainer, borderColor: validationColor}}>
                    <Text text lightGray>+880</Text>
                  </View>
                  <View style={{...styles.phoneNumberContainer,borderColor:validationColor}}>
                    <TextInput
                        ref={phone}
                        keyboardType={"numeric"}
                        value={phone}
                        value={values.phone}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        touched={touched.phone}
                        onSubmitEditing={() => password.current?.focus()}
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        style={{
                          fontFamily: "Montserrat_400Regular",
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
                  onSubmitEditing={() => handleSubmit()}
              />


              <View>
                <Text marginB-8 text>
                  CV/Resume*
                </Text>
                <View style={styles.uploadContainer}>
                  <View style={styles.uploadStyle}>
                    <TouchableOpacity paddingH-8 paddingV-3 onPress={pickDocument}>
                      <Text blue subtitle3>
                        Choose File
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.fileNameStyle} paddingH-10 paddingV-4>
                    <Text>{cv?.name}</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity marginV-15 onPress={handleSubmit}>
            {/*<TouchableOpacity marginV-15 onPress={registration}>*/}
            <FilledBtn title={"Continue"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    // <SafeAreaView style={{ flex: 1 }}>
    //   <View style={{ flex: 1 }}>
    //     <CommonHeader name={route.name} navigation={navigation} />
    //     <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
    //   </View>
    //
    //   <View paddingH-16 style={{ flex: 12 }}>
    //     <ScrollView showsVerticalScrollIndicator={false}>
    //       <Text subtitle4 blue marginB-10>
    //         {title}
    //       </Text>
    //       <View>
    //         <Text text gray marginB-20>
    //           If already have Mediusware job account then please{" "}
    //           <Text onPress={() => navigation.navigate("Login")} blue>
    //             Login
    //           </Text>
    //         </Text>
    //       </View>
    //       {/*{state.errorMessage ? <ErrorMsg msg={state.errorMessage} /> : null}*/}
    //       {isRegister ? (
    //         <Register
    //           full_name={full_name}
    //           setFull_name={setFull_name}
    //           phone={phone}
    //           setPhone={setPhone}
    //           email={email}
    //           setEmail={setEmail}
    //           password={password}
    //           setPassword={setPassword}
    //           rePassword={rePassword}
    //           setRePassword={setRePassword}
    //           cv={cv}
    //           setCv={setCv}
    //           //error={error}
    //           pickDocument={pickDocument}
    //         />
    //       ) : (
    //         <UserInfo
    //           expSalary={expSalary}
    //           setExpSalary={setExpSalary}
    //           gitUrl={gitUrl}
    //           setGitUrl={setGitUrl}
    //           linkedin={linkedin}
    //           setLinkedin={setLinkedin}
    //           comments={comments}
    //           setComments={setComments}
    //           experience={experience}
    //           setExperience={setExperience}
    //           //error={error}
    //         />
    //       )}
    //     </ScrollView>
    //     {isRegister ? (
    //       <TouchableOpacity marginV-15 onPress={()=>registration()}>
    //         {/*<TouchableOpacity marginV-15 onPress={registration}>*/}
    //         <FilledBtn title={"Continue"} />
    //       </TouchableOpacity>
    //     ) : (
    //       <View row marginV-15>
    //         <TouchableOpacity
    //           flex-1
    //           marginR-10
    //           onPress={() => setIsRegister(true)}
    //         >
    //           <BlueOutlineBtn title={"Back"} />
    //         </TouchableOpacity>
    //         <TouchableOpacity flex-1 onPress={submit}>
    //           {/*<TouchableOpacity flex-1 onPress={() => navigation.navigate('Submission')}>*/}
    //           <FilledBtn title={"Submit"} />
    //         </TouchableOpacity>
    //       </View>
    //     )}
    //   </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    borderColor: "#E9E9E9",
    borderRadius: 10,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 16,
    marginBottom: 15,
    position: "relative",
  },
  uploadStyle: {
    borderColor: "#E9E9E9",
    height: 32,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 10,
    width: "33%",
  },
  fileNameStyle: {
    position: "absolute",
    marginLeft: "40%",
  },
  phoneContainer: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    height: 48,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  phoneNumberContainer: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    height: 48,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flex: 6,
  }
});

export default ApplyScreen;
