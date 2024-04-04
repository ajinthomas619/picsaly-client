import axios from 'axios';

import { getAllUsers_Api,searchUser_Api } from '../../endpoints/common';

export const getAllUserFunction = async() => {
    try{
        const response =await axios.create({withCredentials:true}).get(getAllUsers_Api)
        return response.data
    }
    catch(error){
        return error
    }
}

export const getSearchUserFunction = async(user:string) => {
    try{
        const response = await axios.create({withCredentials:true}).get(`${searchUser_Api}${user}`);
        return response.data
    }
    catch(error){
        return error
    }
}