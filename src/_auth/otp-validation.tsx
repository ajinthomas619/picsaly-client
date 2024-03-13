import  { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import axios from "axios";
import  { useNavigate } from 'react-router-dom'

const OTPValidation = () => {

 const [otp, setOtp] = useState('');
const navigate = useNavigate()

 const validate = async () => {
    try {
      
      const response = await axios.post("http://localhost:3000/api/verify-otp", {
        params: {
          otp: otp, 
        },
      },{withCredentials:true});
      
      navigate('/')
      console.log(response.data);
    } catch (error) {
      
      console.error("Error validating OTP:", error);
    }
 };

 
 useEffect(() => {
   
 }, []); 

 
 return (
    <form onSubmit={(e) => {
      e.preventDefault(); 
      validate();
    }}>
      <h4>Enter The otp number sent to your mail</h4>
      <input className="border " type="number" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <Button type='submit'>Verify</Button>
    </form>
 );
};

export default OTPValidation;