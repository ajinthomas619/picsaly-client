import axios from "axios";
import { deletePost_Api } from "../../endpoints/common";

export const deletePostFunction = async(data:any) =>{
  try{
    return await axios.create({withCredentials:true}).delete(deletePost_Api,data);
  }
  catch(error){
    return error
  }
}