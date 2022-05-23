import React, {useContext, useEffect, useState} from 'react';

import mediusware from "../api/mediusware";
import {Context as AuthContext} from "../contexts/AuthContext";

const useApply = () => {
    const{state,tryLocalLogin} = useContext(AuthContext);
    const [apply, setApply] = useState({});
    const[loader,setLoader] = useState(false);
    const showUser = async () => {
        setLoader(true);
        try {
            const response = await mediusware.get('/apply/', {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            });
            setApply(response.data[0]);
            setLoader(false);
        }catch(err){
            setLoader(false);
        }
    }
    useEffect(()=>{
        tryLocalLogin().then(()=>showUser());
    },[state.token])
    return [apply,loader]
};

export default useApply;