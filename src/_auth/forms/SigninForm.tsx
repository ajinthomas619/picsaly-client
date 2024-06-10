import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup } from "../firebase/firebaseconfig";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginFunction,
  LoginWithGoogleFunction,
} from "@/utils/api/methods/AuthService/post";
import { addUser } from "@/redux/slices/userSlices";
import { UserData } from "@/utils/interfaces/interface";
import toast from "react-hot-toast"
import { FaGoogle } from "react-icons/fa";

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Data = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  useEffect(() => {
    if (Data?.finduser?._id) {
      navigate("/");
    } else {
      navigate("/log-in");
    }
  }, []);

  const formSchema = z.object({
    email: z.string().min(6),
    password: z.string().min(3),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response: any = await LoginFunction({
        email: data.email,
        password: data.password,
      });
    console.log(response.data.status);
    

      if (response.data.status) {
        navigate("/");
        console.log("Registration successful:", response.data);
        dispatch(addUser(response.data.user));
      } else {
        toast.error("invalid credentials")
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      toast.error("Login Failed please check your credentials")
      console.error("Registration failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  const googleSignIn = async () => {
    try {
      const response = await signInWithGooglePopup();
      console.log(response);
      const googleUser = response.user;
      console.log("gooo=", googleUser);
      const userData: UserData = {
        uid: googleUser.uid || "",
        userName: googleUser.displayName || "",
        email: googleUser.email || "",
        profilePicture: googleUser.photoURL || "",
        persisted: true,
        isGoogle: true,
        password: "",
        mobile: "",
        fullname: "",
        bio: "",
        followers: [],
        following: [],
        _id: "",
        createdOn: new Date(Date.now()),
      };
      console.log("g=>", userData);
      const dataa = await LoginWithGoogleFunction(userData);
      console.log("Data sent to backend successfully", dataa?.data);
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In failed:", error);
      setError("Google Sign-In failed. Please try again later.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <img src="/assets/logo.png" alt="logo" className="size-20" />
        </div>

        <h2 className="mb-10 text-center mt-5 font-bold text-3xl">Login</h2>
        <div className="p-3 flex flex-col items-center">
          <div className="flex flex-col items-center ">
            <label className="mb-5 ">
             <p>Email</p> 
              <input
                className="input input-ghost input-bordered "
                type="email"
                {...register("email")}
              />
              {errors.email && typeof errors.email === "string" && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </label>

            <label className="mb-5">
             <p>Password</p> 
              <input
                className="input input-ghost input-bordered"
                type="password"
                {...register("password")}
              />
              {errors.password && typeof errors.password === "string" && (
                <span className="text-red-500">{errors.password}</span>
              )}
            </label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" className="justify-center">Login</Button>
        </div>
      </form>
      <Button className="gap-3" onClick={googleSignIn}>
        
        <span> Sign In With Google</span>
        <FaGoogle className='color-blue-500'/>
        </Button>
      <a href="/sign-up" className="text-blue-500 p-3">
        No Account Yet? Sign Up
      </a>
    </>
  );
};

export default LoginForm;
