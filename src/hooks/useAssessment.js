import React, {useContext, useEffect, useState} from 'react';

import mediusware from "../api/mediusware";
import {Context as AuthContext} from "../contexts/AuthContext";

const useAssessment = () => {
    const{state:{token},tryLocalLogin} = useContext(AuthContext);
    const [assessments, setAssessments] = useState([]);
    const[loader,setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(true);

    const onRefresh =  () => {
        showAssessments();
    }

    const showAssessments = async () => {
        setRefreshing(true);
        setLoader(true);
        try {
            const response = await mediusware.get('/apply/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAssessments(response.data);
            setRefreshing(false);
            setLoader(false);
        }catch(err){
            setRefreshing(false);
            setLoader(false);
        }
    }
    useEffect(()=>{
        tryLocalLogin().then(()=>showAssessments());
    },[token])
    return [assessments,loader,onRefresh,refreshing]
};

export default useAssessment;