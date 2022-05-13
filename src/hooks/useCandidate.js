import React, {useContext, useEffect, useState} from 'react';

import mediusware from "../api/mediusware";
import {Context as AuthContext} from "../contexts/AuthContext";

const useCandidate = () => {
    const{state,tryLocalLogin} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const showUser = async () => {
        try {
            const response = await mediusware.get('/candidate/', {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            });
             setUser(response.data);

        }catch(err){
        }
    }
    useEffect(()=>{
        tryLocalLogin().then(()=>showUser());
    },[state.token])
    return [user]
};

export default useCandidate;