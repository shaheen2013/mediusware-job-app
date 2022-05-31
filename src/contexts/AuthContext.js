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
          return {...state,errorMessage:{}};
      case 'logout':
          return {token:null,errorMessage:{}};
      case 'set_loader':
          return {...state,loader:true}
      case 'clear_loader':
          return {...state,loader:false}
    default:
      return state;
  }
};

const tryLocalLogin = dispatch =>  async () =>{
    const token = await AsyncStorage.getItem('token');
    if(token){
        dispatch({type:'login',payload:token});

    }
}

const clearErrorMsg = dispatch => () =>{
    dispatch({type:'clear_error_msg'})
}

const settingLoader = dispatch => () =>{
    dispatch({type:'set_loader'})
}

const clearLoader = dispatch => () =>{
    dispatch({type:'clear_loader'})
}

const register = dispatch => async (formDataObj,callback) => {
    dispatch({type:'set_loader'});
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
       // dispatch({type:'clear_loader'});
    } catch (err) {
        console.log(err.response.data);
      let emailError = (err.response.data?.email !== undefined);
      let phoneError = (err.response.data?.phone !== undefined);
      emailError && (emailError = "Candidate with this email already exists!");
      phoneError &&  (phoneError = "Candidate with this phone number already exists!");
      dispatch({ type: "add_error", payload: {email:emailError,phone:phoneError} });
      dispatch({type:'clear_loader'});
    }
};

const login = (dispatch) => async ({ email, password },callback) => {
    dispatch({type:'set_loader'});
    try {
      const response = await mediusware.post("/login/", { email, password });
      console.log(response.data , 'login response');
        tokenValue = response.data._token;
        await AsyncStorage.setItem("token", tokenValue);
        dispatch({type:'login',payload:tokenValue});
        if(callback){
            callback();
        }
        //dispatch({type:'clear_loader'});
    } catch (err) {
        console.log("login error: ",err.response.data?.detail);
        dispatch({ type: "add_error", payload: {error:err.response.data?.detail} });
        dispatch({type:'clear_loader'});
    }
};

const apply = (dispatch) => async (token,obj,callback) => {
    dispatch({type:'set_loader'});

    try {
      const response = await mediusware.post(
        "https://hr.mediusware.xyz/api/apply/",obj,
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
      dispatch({type:'clear_loader'});
        console.log('RESPONSE',response.data);
    } catch (err) {
        console.log(err.response.data,'response error');
        dispatch({ type: "add_error", payload: {message:err.response.data?.message} });
        dispatch({type:'clear_loader'});
    }
};
const logout = dispatch => async ()=>{
    await AsyncStorage.removeItem('token');
    dispatch({type:'logout'});
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { login, logout, register, apply, clearErrorMsg, tryLocalLogin},
  { token: null, errorMessage: {},loader:false }
);
