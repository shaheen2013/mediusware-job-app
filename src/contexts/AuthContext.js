import createDataContext from "./createDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import mediusware from '../api/mediusware';
import axios from 'axios';
import {navigate} from '../navigationRef'
let token;

const authReducer = (state,action) =>{
    switch (action.type){
        case 'login':
            return {...state,token:action.payload}
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
             token = response.data._token;
            const tokenValue = JSON.stringify(response.data._token)
            await AsyncStorage.setItem('token', tokenValue)
           // await AsyncStorage.setItem('token', tokenValue);
          //  dispatch({type:'login',payload:tokenValue})
            //await AsyncStorage.setItem('_token',response.data.token);
            console.log("success",response.data._token);
            dispatch({type:'login',payload:tokenValue});
           // navigate('Home')
        } catch (err) {
            console.log("error:",err.response.data);
        }
    }
}
const apply = (dispatch)=>{
    return async ({job_slug,expected_salary,additional_message,additional_fields})=>{
        console.log(token);
        console.log(job_slug,expected_salary,additional_message,additional_fields);
        try {
            const json = JSON.stringify({ job_slug,expected_salary,additional_message,additional_fields });
            const res = await axios.post('https://hr.mediusware.xyz/api/apply/', json, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                   // 'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                   // "cache-control": "no-cache",
                }
            });

            console.log(res);
        }

            /*const response = await mediusware.post('/apply/', {
                "job_slug": "react-developer",
                "expected_salary": "20000",
                "additional_message":"https://github.com/rakibulalam9200",
                "additional_fields": "https://www.linkedin.com/in/rakibul-alam-298691148/"
            },{
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });*/
            //await AsyncStorage.setItem('_token',response.data.token);
            //console.log("success",response.data);
            //dispatch({type:'login',payload:response.data.token})
         catch (err) {
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
    {login,logout,register,apply},
    {token:null,errorMessage:''})
