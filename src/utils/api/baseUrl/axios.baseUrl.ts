import axios from 'axios';

export const BASE_URL = `${import.meta.env.VITE_APP_BASE_URL}/api`




export const axiosPrivate = axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type': 'application/json'} ,
    withCredentials:true // For setting the
})