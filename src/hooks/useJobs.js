import React, {useEffect, useState} from 'react';

import mediusware from "../api/mediusware";
const useResult = () => {
    const [jobs, setJobs] = useState([]);
    const [singleJob,setSingleJob]= useState({});
    //const [errorMessage, setErrorMessage] = useState(false);

    const showJobs = async () => {
        try {
            const response = await mediusware.get('/jobs');
            setJobs(response.data)
        }catch(err){

        }
    }

    useEffect(()=>{
        showJobs()
    },[])

    return [jobs]
};

export default useResult;