import AsyncStorage from "@react-native-async-storage/async-storage";
import mediusware from "../api/mediusware";
import createDataContext from "./createDataContext";
let tokenValue;

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state,token: action.payload };
    case "add_error":
      return { ...state, errorMessage: action.payload };
      case "clear_error_msg":
          return {...state,errorMessage:''};
      case 'logout':
          return {token:null,errorMessage:''}
    default:
      return state;
  }
};
const tryLocalLogin = dispatch =>  async () =>{
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if(token){
        dispatch({type:'login',payload:token});

    }
}

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
      // let payloadMsg;
      // let emailError = (err.response.data?.email !== undefined);
      // let phoneError = (err.response.data?.phone !== undefined);
      // emailError && (payloadMsg = "Candidate with this email already exists!!!");
      // phoneError &&  (payloadMsg = "Candidate with this phone number already exists!!!");
      // dispatch({ type: "add_error", payload: payloadMsg });
    //   console.log("error:", err.response.data);
    //   console.log("error email:", err.response.data.email.length);
    }
  
};

const login = (dispatch) => async ({ email, password }) => {
    console.log(email,password);
    try {
      const response = await mediusware.post("/login/", { email, password });
        tokenValue = response.data._token;
        console.log(tokenValue);
        await AsyncStorage.setItem("token", tokenValue);
        dispatch({type:'login',payload:tokenValue})
     // await AsyncStorage.setItem('_token',response.data.token);L
      console.log("success", response.data);
      //dispatch({ type: "login", payload: tokenValue });
      // navigate('Home')
    } catch (err) {
      console.log("error:", err.response.data);
    }

};
const apply = (dispatch) => async ({ job_slug, expected_salary, additional_message, additional_fields }, callback) => {
    console.log(tokenValue);
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
            Authorization: `Bearer ${tokenValue}`,
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
const logout = dispatch => async ()=>{
    await AsyncStorage.removeItem('token');
    dispatch({type:'logout'});
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { login, logout, register, apply,clearErrorMsg,tryLocalLogin},
  { token: null, errorMessage: "" }
);
