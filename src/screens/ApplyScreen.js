import * as DocumentPicker from "expo-document-picker";
import React, { useContext, useState } from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Text, TouchableOpacity, View } from "react-native-ui-lib";
import Register from "../components/apply/Register";
import UserInfo from "../components/apply/UserInfo";
import BlueOutlineBtn from "../components/buttons/BlueOutlineBtn";
import FilledBtn from "../components/buttons/FilledBtn";
import CommonHeader from "../components/CommonHeader";
import ErrorMsg from "../components/ErrorMsg";
import { Context as AuthContext } from "../contexts/AuthContext";

const ApplyScreen = ({ navigation, route }) => {
  const { state, register, login, apply, clearErrorMsg } =
    useContext(AuthContext);
    //clearErrorMsg();
  const { title, job_slug } = route.params;
  const isIcon = false;
  const [full_name, setFull_name] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [cv, setCv] = useState({});
  const [isRegister, setIsRegister] = useState(true);
  const [expSalary, setExpSalary] = useState("");
  const [gitUrl, setGitUrl] = useState("");
  const [experience, setExperience] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [comments, setComments] = useState("");
  //const [addionalfields, setAdditionalFields] = useState([]);
  const [totalFormDataObj, setTotalFormDataObj] = useState(new FormData());
  let formDataObj = new FormData();
  const [errorMsg, setErrorMsg] = useState({
    nameError:'',
    emailError:'',
    phoneError:'',
    passwordError:'',
    rePasswordError:'',
    expSalaryError:'',
    cvError:'',
    gitUrlError:'',
    linkedinError:'',
    experienceError:'',
    commentError:'',
  });
  //const [error, setError] = useState("");

  // Document Picker Expo
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({type: "application/*" });
    //setResume(result);
    if (result) {
      const { name, uri } = result;
      const uriParts = name.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formDataObj.append("cv", {
        uri,
        name,
        type: `application/${fileType}`,
      });
      setCv(result);
      /*setErrorMsg({
        nameError:'',
        emailError:'',
        phoneError:'',
        passwordError:'',
        rePasswordError:'',
        cvError:'',
        expSalaryError:'',
        gitUrlError:'',
        linkedinError:'',
        experienceError:'',
        commentError:'',
      });*/
    }

    console.log("before: ", totalFormDataObj);
    setTotalFormDataObj(formDataObj);
    // console.log("after: ",totalFormDataObj);
    //console.log(formDataObj);
  };
  const validateEmail = (email) => {
    return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);
  };

  const registration = () => {
    setErrorMsg({
      nameError: full_name.length > 0 ? '' : 'error in name',
      emailError: email.length > 0 ? '' : 'error in email',
      phoneError: '',
      passwordError: '',
      rePasswordError: '',
      expSalaryError: '',
      cvError: '',
      gitUrlError: '',
      linkedinError: '',
      experienceError: '',
      commentError: '',
    })
    /*if (full_name === "") {
      //console.log("name");
      let msg = {...errorMsg};
      msg.nameError = 'Please, Enter your Full Name!!!';
      setErrorMsg(msg);
      console.log("name msg: ",msg);

    }
    if (email === "") {
      console.log("email",errorMsg);
      let msg = {...errorMsg};
      console.log("error email: ",msg);
       msg.emailError = 'Please, Enter your Email Address!!!';
      setErrorMsg(msg);
      // console.log("email msg: ",msg);
    }*/

    /*
    if (!validateEmail(email)) {
      let msg = {...errorMsg}
      msg.emailError = 'Please, Enter your Email Address!!!';
      setErrorMsg(msg);
    }
    if (phone === "") {
      setError("phone");
      setErrorMsg("Please, Enter your Phone Number");
      return;
    }
    if (phone.length !== 10) {
      setError("phone");
      setErrorMsg("Phone Number should be 10 digits without Beginning 0");
      return;
    }

    if (password === "") {
      setError("password");
      setErrorMsg("Please, Enter your Password");
      return;
    }

    if (password.length < 6) {
      setError("password");
      setErrorMsg("Password Should be more than 6 character long");
      return;
    }
    if (password !== rePassword) {
      setError("re_password");
      setErrorMsg("Passwords are not matched!!!");
      return;
    }
    if (password !== rePassword) {
      setError("re_password");
      setErrorMsg("Passwords are not matched!!!");
      return;
    }*/
    /*if (totalFormDataObj._parts.length < 1) {
      let msg = {...errorMsg}
      msg.cvError = 'Please, Upload your CV!!!';
      setErrorMsg(msg);
    }*/
    formDataObj = totalFormDataObj;
    let formData = {
      full_name,
      phone,
      email,
      password,
    };
    for (let key in formData) {
      formDataObj.append(
        key,
        Array.isArray(formData[key])
          ? JSON.stringify(formData[key])
          : formData[key]
      );
    }

    // setErrorMsg({
    //   nameError:'',
    //   emailError:'',
    //   phoneError:'',
    //   passwordError:'',
    //   rePasswordError:'',
    //   cvError:'',
    //   expSalaryError:'',
    //   gitUrlError:'',
    //   linkedinError:'',
    //   experienceError:'',
    //   commentError:'',
    // });

    // call register method for user registration
    // register(formDataObj, () => registerSuccess());
    register(formDataObj);
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
  };

  const validateLinkedin = (linkedinProfile) => {
    return linkedinProfile.match(
      /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/
    );
  };
  const validateGithub = (githubProfile) => {
    return githubProfile.match(
      /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim
    );
  };

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
    const successApply = () =>{
        navigation.navigate("Submission");
      
        setComments("");
        setGitUrl("");
        setLinkedin("");
        setExpSalary("");
        setExperience("");
    }
    //setAdditionalFields([gitUrl,5,linkedin]);
    apply(
      {
        job_slug,
        expected_salary: expSalary,
        additional_message: comments,
        additional_fields: [gitUrl, experience, linkedin],
      },
      () => successApply()
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <CommonHeader name={route.name} navigation={navigation} />
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      </View>

      <View paddingH-16 style={{ flex: 12 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text subtitle4 blue marginB-10>
            {title}
          </Text>
          <View>
            <Text text gray marginB-20>
              If already have Mediusware job account then please{" "}
              <Text onPress={() => navigation.navigate("Login")} blue>
                Login
              </Text>
            </Text>
          </View>
          {/*{state.errorMessage ? <ErrorMsg msg={state.errorMessage} /> : null}*/}
          {isRegister ? (
            <Register
              full_name={full_name}
              setFull_name={setFull_name}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              rePassword={rePassword}
              setRePassword={setRePassword}
              cv={cv}
              setCv={setCv}
              errorMsg={errorMsg}
              //error={error}
              pickDocument={pickDocument}
            />
          ) : (
            <UserInfo
              expSalary={expSalary}
              setExpSalary={setExpSalary}
              gitUrl={gitUrl}
              setGitUrl={setGitUrl}
              linkedin={linkedin}
              setLinkedin={setLinkedin}
              comments={comments}
              setComments={setComments}
              experience={experience}
              setExperience={setExperience}
              errorMsg={errorMsg}
              //error={error}
            />
          )}
        </ScrollView>
        {isRegister ? (
          <TouchableOpacity marginV-15 onPress={()=>registration()}>
            {/*<TouchableOpacity marginV-15 onPress={registration}>*/}
            <FilledBtn title={"Continue"} />
          </TouchableOpacity>
        ) : (
          <View row marginV-15>
            <TouchableOpacity
              flex-1
              marginR-10
              onPress={() => setIsRegister(true)}
            >
              <BlueOutlineBtn title={"Back"} />
            </TouchableOpacity>
            <TouchableOpacity flex-1 onPress={submit}>
              {/*<TouchableOpacity flex-1 onPress={() => navigation.navigate('Submission')}>*/}
              <FilledBtn title={"Submit"} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
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
});

export default ApplyScreen;
