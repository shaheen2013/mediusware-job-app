import createDataContext from "./createDataContext";
import mediusware from '../api/mediusware'
const authReducer = (state,action) =>{
    switch (action.type){
        default:
            return state;
    }
}

const register = (dispatch) =>{
    return async (formDataObj) => {
        try {
            const response = await mediusware.post('/register-candidate/', formDataObj,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("success",response.data);
        } catch (err) {
            console.log("error:",err.response.data);
        }

    }
}

const login = (dispatch)=>{
    return async ({email,password})=>{
        try {
            const response = await mediusware.post('/login/', {email,password});
            console.log("success",response.data);
        } catch (err) {
            console.log("error:",err.response.data);
        }
    }
}

const logout=(dispatch)=>{
    return() =>{

    }
}
export const {Provider,Context} = createDataContext(
    authReducer,
    {login,logout,register},
    {isSignedIn:false})
