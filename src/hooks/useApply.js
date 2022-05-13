import React, {useContext, useEffect, useState} from 'react';

import mediusware from "../api/mediusware";
import {Context as AuthContext} from "../contexts/AuthContext";

const useApply = () => {
    const{state,tryLocalLogin} = useContext(AuthContext);
    const [apply, setApply] = useState({});
    const showUser = async () => {
        try {
            const response = await mediusware.get('/apply/', {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            });
            setApply(response.data[0]);
        }catch(err){
        }
    }
    useEffect(()=>{
        tryLocalLogin().then(()=>showUser());
    },[state.token])
    // const [singleJob,setSingleJob]= useState({});
    //const [errorMessage, setErrorMessage] = useState(false);
    // useEffect(()=>{
    //     showUser();
    // },[state.token])

    return [apply]
};

export default useApply;