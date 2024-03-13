import  { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AdminloginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
  
    useEffect(() => {}, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData ={email,password}
         
          const response = await axios.post(
            "http://localhost:3000/api/adminlogin",
          userData,
            { withCredentials: true }
          );
       0 
          if (response && response.data) {
            console.log("Registration successful:", response.data);
            navigate("/admin");
          } else {
            console.error("Unexpected response structure:", response);
          }
        } catch (error) {
          console.error("Registration failed:");
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
    <div>
      <form className="flex flex-col items-center">
        <label className="mb-5">
          Email
          <input
            className="border ml-5"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="mb-5">
          Password
          <input
            className="border ml-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </form>

      <Button type="submit">Login</Button>
    </div>
  </form>
  )
}

export default AdminloginForm