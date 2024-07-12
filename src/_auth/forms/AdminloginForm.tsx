import  { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addAdmin,clearAdmin } from "@/redux/slices/adminSlice";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";



const AdminloginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const admin = useSelector((state:any) => state.persisted.admin.adminData)
  
    useEffect(() => {}, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData ={email,password}

            console.log("the admin data",admin)
         
          const response = await axios.post(
            `${BASE_URL}/adminlogin`,
          userData,
            { withCredentials: true }
          );
          if (response && response.data) {
            console.log("Registration successful:", response.data);
            dispatch(clearAdmin())
            navigate("/admin");
            dispatch(addAdmin(userData))
          } else {
            console.error("Unexpected response structure:", response);
          }
        } catch (error) {
          console.error("Registration failed:",error);
        }
        setEmail("");
        setPassword("");
      };
  return (
    <form onSubmit={handleSubmit}>
    <div className="flex justify-center">
      <img src="/assets/logo.png" alt="logo" className="size-20" />
    </div>

    <h2 className="mb-10 text-center mt-5 font-bold text-3xl">Admin Login</h2>
    <div className="p-3 flex flex-col items-center">
      
        <div className="flex flex-col items-center">
        <label className="mb-5 ">
         <p> Email </p> 
          <input
            className="input input-ghost input-bordered"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="mb-5 ">
          <p> Password </p>
          <input
            className="input input-ghost input-bordered"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        </div>
      

      <Button type="submit" className="justify-center">Login</Button>
    </div>
  </form>
  )
}

export default AdminloginForm