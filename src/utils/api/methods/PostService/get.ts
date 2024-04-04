import axios from "axios";
import { getPost_Api,getAllPost_Api, } from "../../endpoints/common";

export const getPostFunction = async(id:string) =>{
    try{
        return axios.create({withCredentials:true}).get(`${getPost_Api},${id}`)
    }
    catch(error){
        console.log("{error in fetching post",error)
    }
}

export const getAllPostFunction = async() =>{
try{
    return axios.create({withCredentials:true}).get(getAllPost_Api)
}
catch(error){
    console.log("error in showing all post",error)
}
}