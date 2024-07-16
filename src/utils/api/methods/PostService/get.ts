import axios from "axios";
import { getPost_Api,getAllPost_Api, getPostForHome_Api, } from "../../endpoints/common";

export const getPostFunction = async(id:string) =>{
    try{
        return axios.create({withCredentials:true}).get(`${getPost_Api},${id}`)
    }
    catch(error){
        console.log("{error in fetching post",error)
    }
}

export const getAllPostFunction = async(id:String) =>{
try{
    return axios.create({withCredentials:true}).get(`${getAllPost_Api}/${id}`)
}
catch(error){
    console.log("error in showing all post",error)
}
}

export const getPostorHome = async(id:String,page:any) => {
    try{
        return axios.create({withCredentials:true}).get(`${getPostForHome_Api}/${id}`,{
            params:{page,limit:10},
        })
    }
    catch(error){
        console.log("reeoin getting post for home",error)
    }
}