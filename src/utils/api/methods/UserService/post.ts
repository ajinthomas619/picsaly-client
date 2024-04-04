import axios from "axios";

import { getUserByName_Api,getUserData_Api,updateProfile_Api,addProfile_Api,addProfileImage_Api,getUser_Api } from "../../endpoints/common";

export const getUserFunction = async(data:any) => {
    try{
        const datas ={id:data}
        const response = await axios.create({withCredentials:true}).post(getUser_Api,datas)
        return response.data
    }
    catch(error){
        console.log("error in getting user",error)
        return error
    }
}
export const getUserByNameFunction = async(data:string) =>{
    try{
        const body ={name:data}
        const response = await axios.create({withCredentials:true}).post(getUserByName_Api,body)
        return response.data
    }
    catch(error){
        return error
    }
}

export const addProfileFunction = async(data:any) =>{
    try{
        return axios.create({withCredentials:true}).post(addProfile_Api,data)
    }
    catch(error){
        console.log("error in adding profile",error)
    }
}
export const addProfileImageFunction = async(formData:FormData)=>{
    try{
        const response = await axios.post(addProfileImage_Api,formData,{
            withCredentials:true,
            headers:{
                "Content-Type" : "multipart/form-data"
            }
        })
        return response.data
    }
    catch(error){
        console.error("Error in uploading image to server",error)
        throw error
    }
}
export const editProfileFunction = async(data:any) => {
    try{
        return axios.create({withCredentials:true}).post(updateProfile_Api,data)
    }
    catch(error){
        return error
    }
}
export const getUserDataFunction = async(data:any) =>{
    try{
        return axios.create({withCredentials: true}).post(getUserData_Api,data)
    }
    catch(error){
        console.log("error",error)
    }
}