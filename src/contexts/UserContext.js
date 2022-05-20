import mediusware from "../api/mediusware";
import createDataContext from "./createDataContext";
import {Context as AuthContext} from "./AuthContext";
// import {useContext} from "react";
//
// const {state,tryLocalLogin,logout} = useContext(AuthContext);

const userReducer = (userState, action) => {
    switch (action.type) {
        case "editUser":
            return { ...userState, user:action.payload};
        case "add_error":
            return { ...userState, errorMessage: action.payload };
        case "clear_error_msg":
            return {...userState,errorMessage:{}};
        case 'set_loader':
            return {...userState,loader:true}
        case 'clear_loader':
            return {...userState,loader:false}
        default:
            return userState;
    }
};

const clearErrorMsg = dispatch => () =>{
    dispatch({type:'clear_error_msg'})
}
const settingLoader = dispatch => () =>{
    dispatch({type:'set_loader'})
}

const clearLoader = dispatch => () =>{
    dispatch({type:'clear_loader'})
}

const updateUser = dispatch => async (formDataObj,token,callback,) => {
    dispatch({type:'set_loader'});
    try {
        const response = await mediusware.post('/candidate/', formDataObj,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });
        console.log(response.data);
        dispatch({ type: "editUser", payload: {user:response.data}});
        if(callback){
            callback();
        }
        dispatch({type:'clear_loader'});
    } catch (err) {
        dispatch({ type: "add_error", payload: {error:err?.response?.data?.current_password}});
        dispatch({type:'clear_loader'});
    }
};

const getUser = dispatch => async (token, callback) => {
    try {
        const response = await mediusware.get('/candidate/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: "editUser", payload: {user:response.data}});
        console.log("response data: ",response.data);
        if(callback){
            callback();
        }
    } catch (err) {

    }
};

export const { Provider, Context } = createDataContext(
    userReducer,
    {updateUser,clearErrorMsg,getUser},
    {user:{},errorMessage: {},loader:false }
);