import React, {useContext, useEffect, useState,useCallback} from 'react';
import mediusware from "../api/mediusware";
import {Context as AuthContext} from "../contexts/AuthContext";

const useCandidate = () => {
    const{state,tryLocalLogin} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [refreshing, setRefreshing] = useState(true);

    const onRefresh =  () => {
        showUser();
    }
        const showUser = async () => {
            setRefreshing(true)
                console.log('on refresh');

            try {
                console.log('refreshing',refreshing);
                const response = await mediusware.get('/candidate/', {
                    headers: {
                        Authorization: `Bearer ${state.token}`
                    }
                });
                setUser(response.data);
                setRefreshing(false);

            }catch(err){
               setRefreshing(false);
            }
        }
    // },[refreshing])


    useEffect(()=>{
        tryLocalLogin().then()
    },[state.token])

    return [user,onRefresh,refreshing]
    // return [user,refreshing,onRefresh]
};

export default useCandidate;