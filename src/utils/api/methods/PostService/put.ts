import axios from "axios";

import { updatePost_Api } from "../../endpoints/common";

export const updatePostFunction = async(data:any) => {
    try{
    return axios.create({withCredentials:true}).put(updatePost_Api,data)
    }
    catch(error){
        console.log("error in updating post",error)
        return error
    }

}