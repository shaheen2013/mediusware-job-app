import React, {useEffect, useState} from 'react';
import mediusware from "../api/mediusware";
const useResult = () => {
    const [jobs, setJobs] = useState([]);
    const [singleJob,setSingleJob]= useState({});
    const[isLoading,setIsLoading] = useState(false);
    //const [errorMessage, setErrorMessage] = useState(false);

    const showJobs = async () => {
        setIsLoading(true);
        try {
           // console.log("isloading",isLoading);
            const response = await mediusware.get('/jobs');
            setJobs(response.data);
            setIsLoading(false);
            //console.log("isloading2",isLoading);
        }catch(err){
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        showJobs()
    },[])

    return [jobs,isLoading,setIsLoading]
};

export default useResult;