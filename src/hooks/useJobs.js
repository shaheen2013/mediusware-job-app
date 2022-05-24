import React, {useEffect, useState} from 'react';
import mediusware from "../api/mediusware";
const useResult = () => {
    const [jobs, setJobs] = useState([]);
    const [singleJob,setSingleJob]= useState({});
    const [refreshing, setRefreshing] = useState(true);
    const[isLoading,setIsLoading] = useState(false);
    //const [errorMessage, setErrorMessage] = useState(false);

    const onRefresh =  () => {
        showJobs();
    }

    const showJobs = async () => {
        setRefreshing(true)
        setIsLoading(true);
        try {
            const response = await mediusware.get('/jobs');
            setJobs(response.data);
            setIsLoading(false);
            setRefreshing(false);
        }catch(err){
            setIsLoading(false);

        }
    }

    useEffect(()=>{
        showJobs()
    },[])

    return [jobs,isLoading,setIsLoading,onRefresh,refreshing]
};

export default useResult;