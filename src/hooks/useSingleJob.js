import React, {useEffect, useState} from 'react';

import mediusware from "../api/mediusware";
const useSingleJob = (slug) => {
    const [singleJob, setSingleJob] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const showSingleJob = async () => {
        setIsLoading(true);
        try {
            const response = await mediusware.get(`/job/${slug}`);
            setSingleJob(response.data);
            setIsLoading(false);
        }catch(err){

        }
    }

    useEffect(()=>{
        showSingleJob()
    },[slug])

    return [singleJob,isLoading]
};

export default useSingleJob;