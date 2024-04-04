import axios from "axios";
import { UserData } from "@/utils/interfaces/interface";
import { FollowUnfollowUser_Api,Login_Api,Signup_Api,GoogleLogin_Api,VerifyOTP_Api,AdminLogin_Api,Logout_Api } from "../../endpoints/common";

export const LoginFunction = async(data:any) => {
    try{
        return axios.create({withCredentials:true}).post(Login_Api,data)
    }
    catch(error){
        return error
    }
}
export const Logoutfunction = async() => {
    try{
        return axios.create({withCredentials:true}).get(Logout_Api);
    }
    catch(error){
        return error
    }
}
export const SignUpFunction = async(data:any) => {
    try{
        return axios.create({withCredentials:true}).post(Signup_Api,data)
    }
    catch(error){
        return error
    }
}

export const verifyOtpFunctiom = async(data:any) => {
    try{
        return axios.create({withCredentials:true}).post(VerifyOTP_Api,data)
    }
    catch(error){
        return error
    }
}
export const AdminLoginFunction = async(data:any) =>{
    try{
        return axios.create({withCredentials:true}).post(AdminLogin_Api,data)
    }
    catch(error){
        return error
    }
}

export const LoginWithGoogleFunction = async(data:UserData) =>{
    try{
        return axios.create({withCredentials:true}).post(GoogleLogin_Api,data)
    }
    catch(error){
        console.log("error i dsd",error )
        
    }
}

export const FollowUnfollowUserFunction = async(data:any) => {
    try{
        return axios.create({withCredentials:true}).post(FollowUnfollowUser_Api,data)
    }
    catch(error){
        console.log("error",error)
    }
}