import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';
import { SignUpFunction } from "@/utils/api/methods/AuthService/post";
import { useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";

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
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  useEffect(() => {
    if (formSubmitted) {
      validateForm();

      const timeoutId = setTimeout(() => {
        setFormSubmitted(false);
        setFormErrors({});
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [username, name, email, password, mobile, confirmPassword, formSubmitted]);

  const validateForm = () => {
    let errors: FormErrors = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    if (!name.trim()) {
      errors.name = 'Full Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    if (!mobile.trim()) {
      errors.mobile = 'Mobile is required';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      const data = {
        username:username,
        name:name,
        email:email,
        mobile:mobile,
        password:password,
        confirmPassword:confirmPassword


      }
   const response = await SignUpFunction(data)

      if (response ) {
     
        console.log('Registration successful:', response);
        setUsername('');
        setName('');
        setEmail('');
        setMobile('');
        setPassword('');
        setConfirmPassword('');

        navigate('/verify-otp');
      } else {
        console.error('Unexpected response structure:', response);
      }
    } catch (error) {
      console.error('Registration failed:', (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="flex justify-center">
        <img src="/assets/logo.png" alt="logo" className="size-20" />
      </div>

      <h2 className="mb-10 text-center mt-5 font-bold text-3xl">Sign up</h2>
      <div className="flex flex-col items-center w-full max-w-md">

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="username" className="block mb-1">Username</label>
          <input id="username" className="border w-full" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {formErrors.username && <p className="text-red-500 text-xs">{formErrors.username}</p>}
        </div>

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="name" className="block mb-1">Full Name</label>
          <input id="name" className="border w-full" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
        </div>

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input id="email" className="border w-full" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
        </div>

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="mobile" className="block mb-1">Mobile</label>
          <input id="mobile" className="border w-full" type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          {formErrors.mobile && <p className="text-red-500 text-xs">{formErrors.mobile}</p>}
        </div>

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="password" className="block mb-1">Password</label>
          <input id="password" className="border w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {formErrors.password && <p className="text-red-500 text-xs">{formErrors.password}</p>}
        </div>

        <div className="mb-5 w-full max-w-md">
          <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
          <input id="confirmPassword" className="border w-full" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {formErrors.confirmPassword && <p className="text-red-500 text-xs">{formErrors.confirmPassword}</p>}
        </div>

        <Button type="submit">Sign up</Button>
        <a href="/" className="text-blue-500">Already A User? Login</a>

      </div>
    </form>
  );
};

export default SignupForm;
