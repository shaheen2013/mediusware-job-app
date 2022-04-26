import React, {useEffect, useState} from 'react';
import mediusware from "../api/mediusware";
const useApply = () => {
    const [apply, setApply] = useState([]);
    const showApply = async () => {
        try {
            const response = await mediusware.get('/apply/');
            console.log(response.data);
            setApply(response.data)
        }catch(err){

        }
    }

    useEffect(()=>{
        showApply()
    },[])

    return [apply]
};

export default useApply;