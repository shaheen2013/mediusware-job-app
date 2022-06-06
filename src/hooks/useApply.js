import React, {useContext, useEffect, useState} from 'react';

import mediusware from "../api/mediusware";
import {Context as AuthContext} from "../contexts/AuthContext";

const useApply = () => {
    const{state:{token},tryLocalLogin} = useContext(AuthContext);
    const [apply, setApply] = useState([]);
    const[loader,setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(true);

    const onRefresh =  () => {
        showApply();
    }

    const showApply = async () => {
        setRefreshing(true);
        setLoader(true);
        try {
            const response = await mediusware.get('/apply/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setApply(response.data);
            setRefreshing(false);
            setLoader(false);
        }catch(err){
            setRefreshing(false);
            setLoader(false);
        }
    }
    useEffect(()=>{
        tryLocalLogin().then(()=>showApply());
    },[token])
    return [apply,loader,onRefresh,refreshing]
};

export default useApply;