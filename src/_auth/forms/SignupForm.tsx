import { Button } from "@/components/ui/button"
import { useState,useEffect } from "react";
import axios from 'axios'
import  { useNavigate } from 'react-router-dom'

interface FormErrors{
   username?:string;
   name?:string;
   email?: string;
   password?:string;
   mobile?:string;
   confirmPassword?:string
}

const SignupForm: React.FC = () => {
    const [username,setUsername] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [mobile,setMobile] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [formErrors,setFormErrors] = useState<FormErrors>({})
    const [formSubmitted,setFormSubmitted] = useState(false)

     const navigate = useNavigate()


  useEffect(()=>{
    if(formSubmitted){
validateForm()

const timeoutId = setTimeout(()=>{
  setFormSubmitted(false)
  setFormErrors({})
},1000)
return () => clearTimeout(timeoutId)
    }
  }, [username,name, email, password, mobile, confirmPassword,formSubmitted])

  const validateForm = () =>{
   let errors:FormErrors ={};
   if(!username.trim()){
      errors.username = 'username is required';
   }
   if(!name.trim()){
      errors.name = 'Full Name is required';
   }
   if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address';
    }
    if(!password.trim()){
      errors.password = 'Password is required'
    }
    if(!mobile.trim()){
      errors.mobile = 'Mobile is required'
    }
    if(password !== confirmPassword){
      errors.confirmPassword = 'Passwords do not match'
    }
    setFormErrors(errors)
  }
const handleSubmit = async (e: React.FormEvent)  => {
    e.preventDefault();
    setFormSubmitted(true)
    try{
      const response =  await axios.post('http://localhost:3000/api/signup',{
         username,name,email,password,mobile
      },{withCredentials:true});
    if (response && response.data) {
         console.log('Registration successful:', response.data);
         setUsername('');
         setName('')
         setEmail('');
         setMobile('');
         setPassword('');
         setConfirmPassword('');

         navigate('/verify-otp')
       } else {
         console.error('Unexpected response structure:', response);
       }    }
    catch(error){
      console.error('Registration failed:',(error as Error).message)
   
    }

      
}

  return (
   <form onSubmit={handleSubmit}  className="flex flex-col items-center">
      <div className="flex justify-center">
         <img src="/assets/logo.png" alt="logo" className="size-20" />
        </div>
        
       <h2 className="mb-10 text-center mt-5 font-bold text-3xl">Sign up</h2>
       <div className="flex flex-col items-center w-full max-w-md">
       
     <label className="mb-5 " >username 
        <input className="border ml-16" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        {formErrors.username && <p className="text-red-500 text-xs">{formErrors.username}</p>}
        </label>
     <label className="mb-5 " >Full Name 
        <input className="border ml-16" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {formErrors.name && <p className="text-red-500 text-xs">{formErrors.username}</p>}
        </label>
          
     <label className="mb-5" >email 
        <input className="border ml-16" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
        </label>
          
     <label className="mb-5" >mobile 
        <input className="border ml-14" type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        {formErrors.mobile && <p className="text-red-500 text-xs">{formErrors.mobile}</p>}
        </label>
     <label className="mb-5 "  >password
     <input className="border ml-10" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
     {formErrors.password && <p className="text-red-500 text-xs">{formErrors.password}</p>} 
        </label>
          
     <label className="mb-5  "  > confirm password
        <input className="border mb-5 mr-5" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {formErrors.confirmPassword && <p className="text-red-500 text-xs">{formErrors.confirmPassword}</p>}
        </label>
          


     
       <Button type="submit">Sign up</Button>  
      
        </div>
        </form>
  )
}

export default SignupForm