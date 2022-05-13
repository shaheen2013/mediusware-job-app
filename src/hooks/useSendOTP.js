import React, {useContext, useEffect, useState} from 'react';

import mediusware from "../api/mediusware";
import {Context as AuthContext} from "../contexts/AuthContext";

const useSendOTP = () => {
    const{state,tryLocalLogin} = useContext(AuthContext);
    const [apply, setApply] = useState({});
    const sendOTP = async () => {
        try {
            const response = await mediusware.get('/send-otp/', {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            });

        }catch(err){

        }
    }
    useEffect(()=>{
        tryLocalLogin().then(()=>sendOTP());
    },[state.token])
    // const [singleJob,setSingleJob]= useState({});
    //const [errorMessage, setErrorMessage] = useState(false);
    // useEffect(()=>{
    //     showUser();
    // },[state.token])

    return [apply]
};

export default useSendOTP;