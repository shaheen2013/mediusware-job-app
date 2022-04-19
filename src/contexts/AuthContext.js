import createDataContext from "./createDataContext";
import mediusware from '../api/mediusware'
const authReducer = (state,action) =>{
    switch (action.type){
        default:
            return state;
    }
}

const apply = (dispatch) =>{
    return async ({full_name, email, password, phone, cv}) => {
        try {
            const response = await mediusware.post('/register-candidate/',{full_name, email, password, phone, cv});
            console.log("success",response.data);
        } catch (err) {
            console.log("error:",err.response.data);
        }

    }
}

const login = (dispatch)=>{
    return({email,password})=>{

    }
}

const logout=(dispatch)=>{
    return() =>{

    }
}
export const {Provider,Context} = createDataContext(
    authReducer,
    {login,logout,apply},
    {isSignedIn:false})
