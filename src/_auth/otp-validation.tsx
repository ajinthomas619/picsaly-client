import  { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';

import  { useNavigate } from 'react-router-dom'
import { verifyOtpFunctiom } from "@/utils/api/methods/AuthService/post";
import { addUser,clearUser } from "@/redux/slices/userSlices";
import {  useDispatch, useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";
import toast from "react-hot-toast"

const OTPValidation = () => {

 const [otp, setOtp] = useState('');
const navigate = useNavigate()
const dispatch = useDispatch()


const Data = useSelector(
  (state: UserData) => state.persisted.user.userData
);


 const validate = async (e:any) => {
    try {
     
      
      const response:any =await  verifyOtpFunctiom({otp:otp})
      console.log("response of otp",response)
      if(response.data?.status === false){
        toast.error(response?.data?.message)
      }
      else{
        const data:UserData ={
          fullname: response.data.user?.fullname??"",
          userId:response.data.user?.uid??"",
          email:response.data.user?.email??"",
          userName:response.data.user?.username??"",
          profilePicture:response.data.user?.profile_picture??"",
          persisted:true,
          isGoogle:false,
          password:response.data.user?.password??"",
          mobile:response.data.user?.mobile??"",
          bio:response.data.user?.bio??"",
          _id:response.data.user?._id??"",
          followers:response.data.user?.followers??[],
          following:response.data.user?.following??[],
          createdOn:new Date(Date.now())

        }
        console.log(response?.data,"response?.data?.status");
        console.log("user data",data)
        dispatch(clearUser())
        dispatch(addUser(data))
        if (response?.data?.status) {
          toast.success(response?.data?.message);
          navigate("/log-in",{ replace: true });
        } else {
          toast.error(response?.data?.message);
        }

      }
     
  
    } catch (error) {
      
      console.error("Error validating OTP:", error);
      toast.error("error validating otp")
    }
 };

 


 
 return (
    <form onSubmit={(e) => {
      e.preventDefault(); 
      validate(otp);
    }}>
      <h4>Enter The otp number sent to your mail</h4>
      <input className="input input-ghost input-bordered " type="number" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <Button type='submit'>Verify</Button>
    </form>
 );
};

export default OTPValidation;