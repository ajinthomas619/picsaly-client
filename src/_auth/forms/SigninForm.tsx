import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup } from "../firebase/firebaseconfig";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {}, []);
  const googleSignIn = async () => {
    try {
      const response = await signInWithGooglePopup();
      console.log(response);
      const googleUser = response.user;
      console.log("gooo=",googleUser);
      const userData = {
        uid: googleUser.uid,
        name: googleUser.displayName,
        email: googleUser.email,
        ProfilePic: googleUser.photoURL,
      };
      console.log("g=>", userData);
      const dataa = await axios.post("http://localhost:3000/api/googleLogin", 
        userData
      ,{withCredentials:true});
      console.log("Data sent to backend successfully", dataa.data);
      navigate("/home");
    } catch (error) {
      console.error("Google Sign-In failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
   
      const response = await axios.post(
        "http://localhost:3000/api/",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      
      if (response && response.data) {
        console.log("Registration successful:", response.data);
        navigate("/home");
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
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <img src="/assets/logo.png" alt="logo" className="size-20" />
        </div>

        <h2 className="mb-10 text-center mt-5 font-bold text-3xl">Login</h2>
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
      <Button onClick={googleSignIn}>Sign In With Google</Button>
    </>
  );
};

export default LoginForm;
