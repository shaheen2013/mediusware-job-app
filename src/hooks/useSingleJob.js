import React, {useEffect, useState} from 'react';

import mediusware from "../api/mediusware";
const useSingleJob = (slug) => {
    const [singleJob, setSingleJob] = useState({});
    //const [errorMessage, setErrorMessage] = useState(false);

    const showSingleJob = async () => {
        try {
            const response = await mediusware.get(`/job/${slug}`);
            setSingleJob(response.data)
        }catch(err){

        }
    }

    useEffect(()=>{
        showSingleJob()
    },[slug])

    return [singleJob]
};

export default useSingleJob;