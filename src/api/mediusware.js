import axios from 'axios';
export default  axios.create({
    baseURL:'https://hr.mediusware.xyz/api',
    // headers:{
    //      Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //     //Authorization: 'Bearer AYenoVVb3aiadGLpV7RM70GcaUJb5KRWVc0qAM_cE7p4oC3C_SMQDVuhPoRsPzi7d1WQnywgv6r4ehqbJrkAEsCc_-ewH5_S7Umih_OkqkC7XkrwJKu8a6FzrUAWYnYx'
    // }
});