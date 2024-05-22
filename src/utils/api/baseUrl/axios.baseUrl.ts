import axios from 'axios';

export const AUTH_URL = 'http://localhost:3000/api'
export const USER_URL = 'http://localhost:3000/api'
export const POST_URL = 'http://localhost:3000/api'



export const axiosPrivate = axios.create({
    baseURL:AUTH_URL,
    headers:{'Content-Type': 'application/json'} ,
    withCredentials:true // For setting the
})