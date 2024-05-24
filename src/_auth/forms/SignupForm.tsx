import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpFunction } from "@/utils/api/methods/AuthService/post";
import { useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";
import toast from "react-hot-toast";

interface FormErrors {
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  mobile?: string;
  confirmPassword?: string;
}

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState<string | null>(null); // For managing toast visibility

  const navigate = useNavigate();
  const userData = useSelector((state: UserData) => state.persisted.user.userData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      setShowToast('not valid');
      return;
    }

    try {
   
      const data = {
        username: username,
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        confirmPassword: confirmPassword,
      };
      const response = await SignUpFunction(data);
      console.log("the response",response)

      if (response?.data?.status) {
        setUsername("");
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setConfirmPassword("");
        navigate("/verify-otp");
      } else {
        setShowToast("please fill out valid credentials");
      }
    } catch (error) {
      console.error("Registration failed:", (error as Error).message);
      setShowToast("An error occurred during registration.");
    }
  };

  const validateForm = () => {
    let errors: FormErrors = {};

    const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9 ]*$/;
    if (!username.trim() ||!usernameRegex.test(username)) {
      errors.username =
        "Username should contain only alphanumeric characters and no leading/trailing spaces.";
    }

    const nameRegex = /^[a-zA-Z\s]*$/;
    if (!name.trim() ||!nameRegex.test(name)) {
      errors.name =
        "Full Name should consist of alphabetic characters and spaces only.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() ||!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/;
    if (!password.trim() ||!passwordRegex.test(password)) {
      errors.password =
        "Password should have at least 8 characters including uppercase, lowercase, digits, and special characters.";
    }

    if (password!== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Mobile validation
    const mobileRegex = /^\+?\d{10}$/; 
    if (!mobile.trim() ||!mobileRegex.test(mobile)) {
      errors.mobile = "Please enter a valid mobile number.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  return (
    <form onSubmit={handleSubmit} className="form-control">
      <div className="flex justify-center">
        <img src="/assets/logo.png" alt="logo" className="size-20 " />
      </div>

      <h2 className="mb-10 text-center mt-5 font-bold text-3xl">Sign up</h2>
      <div className="flex flex-col items-center w-full max-w-md ">
        <div className="mb-5 w-full max-w-md">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            id="username"
            className="input input-ghost input-bordered input-xs"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {formErrors.username && toast.error(formErrors.username)}
        </div>

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="name" className="block mb-1">
            Full Name
          </label>
          <input
            id="name"
            className="input input-ghost input-bordered input-xs"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {formErrors.name && toast.error(formErrors.name)}
        </div>

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            className="input input-ghost input-bordered input-xs"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {formErrors.email && toast.error(formErrors.email)}
        </div>

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="mobile" className="block mb-1">
            Mobile
          </label>
          <input
            id="mobile"
            className="input input-ghost input-bordered input-xs"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {formErrors.mobile && toast.error(formErrors.mobile)}
        </div>

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            id="password"
            className="input input-ghost input-bordered input-xs"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {formErrors.password && toast.error(formErrors.password)}
        </div>

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            className="input input-ghost input-bordered input-xs"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {formErrors.confirmPassword && toast.error(formErrors.confirmPassword)}
        </div>

        <Button type="submit">Sign up</Button>
       
        <a href="/log-in" className="text-blue-500">
          Already A User? Login
        </a>
      </div>
    </form>
  );
};

export default SignupForm;
