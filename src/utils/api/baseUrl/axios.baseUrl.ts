import axios from 'axios';

export const BASE_URL = 'http://localhost:3000/api'




export const axiosPrivate = axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type': 'application/json'} ,
    withCredentials:true // For setting the
})