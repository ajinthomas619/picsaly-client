import axios from "axios";

import { PostData } from "@/utils/interfaces/interface";
import { likePost_Api,commentPost_Api,createPost_Api } from "../../endpoints/common";
import { setPost } from "@/redux/slices/postSlice";

export const likePostFunction = async(postId:string,userId:string,liked:boolean) => {
    const data = {
        postId:postId,
        userId:userId,
        liked:liked
    }
    console.log("data for passing",data)
    console.log("post data",data)
    try{

        const response = await axios.create({withCredentials:true}).post(`http://localhost:3002/api/post/like-post/${postId}`,{
            postId: data.postId,
            userId: data.userId,
            liked: data.liked
          })
          console.log("response iss",response)
          return response
     
    }
    catch(error){
        return error
    }
}
export const commentPostFunction = async(postId:string,comment:string) => {
    const data = {
        postId:postId,
        comment:comment
    }
    try{
    return axios.create({withCredentials:true}).post(`${commentPost_Api}/${postId}`,data)
    }
    catch(error){
        return error
    }
}

export const createPostFunction = async (data: any) => {
    try {
        console.log("create post function")
        console.log("datatta isssss",data)
      
       // Directly use axios.post without creating an instance
       const response = await axios.post(createPost_Api,data, {
         headers: { 'Content-Type': 'multipart/form-data' },
         withCredentials: true,
       });
       console.log("response of create post",response.data)
   
       return response;
    } catch (error) {
       console.error("Error in creating post", error);
       throw error; // Throw the error to be handled by the caller
    }
   };