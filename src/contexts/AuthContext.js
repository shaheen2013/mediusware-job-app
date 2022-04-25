import AsyncStorage from "@react-native-async-storage/async-storage";
import mediusware from "../api/mediusware";
import createDataContext from "./createDataContext";
let token;

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state,token: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };
      case "clear_error_msg":
          return {...state,errorMessage:''}
    default:
      return state;
  }
};

const clearErrorMsg = dispatch => () =>{
    dispatch({type:'clear_error_msg'})
}
const register = dispatch => async (formDataObj,callback) => {
    try {
      const response = await mediusware.post(
        "/register-candidate/",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(callback){
          callback();
      }
      
      console.log("success", response.data);
    } catch (err) {
      let payloadMsg;
      let emailError = err.response.data?.email;
      let phoneError = err.response.data?.phone;
      emailError && payloadMsg = "Candidate with this email already exists!!!";  
      phoneError && payloadMsg = "Candidate with this phone number already exists!!!";
     
      dispatch({ type: "add_error", payload: payloadMsg });
      // console.log("emaillength:",err.response.data.email.length);
      // console.log("phonelength:",err.response.data.phone.length);
      console.log("error:", err.response.data);
      console.log("error email:", err.response.data.email.length);
    }
  
};

const login = (dispatch) => async ({ email, password }) => {
    try {
      const response = await mediusware.post("/login/", { email, password });
      token = response.data._token;
      const tokenValue = JSON.stringify(response.data._token);
      //await AsyncStorage.setItem("token", tokenValue);
      await AsyncStorage.setItem('token', tokenValue);
       dispatch({type:'login',payload:tokenValue})
     // await AsyncStorage.setItem('_token',response.data.token);
      console.log("success", response.data._token);
      dispatch({ type: "login", payload: tokenValue });
      // navigate('Home')
    } catch (err) {
      console.log("error:", err.response.data);
    }

};
const apply = (dispatch) => async ({ job_slug, expected_salary, additional_message, additional_fields }, callback) => {
    console.log(token);
    console.log(
      job_slug,
      expected_salary,
      additional_message,
      additional_fields
    );
    try {
      const response = await mediusware.post(
        "https://hr.mediusware.xyz/api/apply/",
        { job_slug, expected_salary, additional_message, additional_fields },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "cache-control": "no-cache",
          },
        }
      );
      if (callback) {
        callback();
      }

      console.log(response);
    } catch (err) {
      console.log("error:", err.response.data);
    }
};
const logout = (dispatch) => {
  return () => {};
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { login, logout, register, apply,clearErrorMsg },
  { token: null, errorMessage: "" }
);
