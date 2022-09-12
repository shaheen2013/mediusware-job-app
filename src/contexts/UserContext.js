import mediusware from "../api/mediusware";
import createDataContext from "./createDataContext";

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
        case 'set_success':
            return {...userState,success:true}
        case 'clear_success':
            return {...userState,success:false}
        default:
            return userState;
    }
};

const settingSuccess = dispatch => () =>{
    dispatch({type:'set_success'})
}

const clearSuccess = dispatch => () =>{
    dispatch({type:'clear_success'})
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

const updateUser = dispatch => async (formDataObj,token,callback) => {
    dispatch({type:'set_loader'});
    try {
        const response = await mediusware.post('/candidate/', formDataObj,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });
        dispatch({ type: "editUser", payload: {user:response.data}});
        dispatch({type:'set_success'})
        if(callback){
            callback();
        }
        dispatch({type:'clear_loader'});
        dispatch({type:'clear_error_msg'});
    } catch (err) {
        dispatch({type:'clear_success'});
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
        if(callback){
            callback();
        }
    } catch (err) {

    }
};

export const { Provider, Context } = createDataContext(
    userReducer,
    {updateUser,clearErrorMsg,getUser,clearSuccess},
    {user:{},errorMessage: {},loader:false,success:false }
);