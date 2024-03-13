import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import OTPValidation from './_auth/otp-validation';
import RootLayout from './_root/RootLayout';
import AdminLayout from './_root/pages/adminLayout';
import { CreatePost, EditPost, Explore, Home, People, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import './globals.css';
import { Routes,Route } from 'react-router-dom';
import AdminAuthLayout from './_auth/AdminAuthLayout';
import AdminloginForm from './_auth/forms/AdminloginForm';

const App = () => {
  return (
 <main className="flex h-screen">
    <Routes>
    {/* public routes}*/}
    <Route element={<AuthLayout/>}>
    <Route path="/"  element={<SigninForm/>}    />
    <Route path="/sign-up"  element={<SignupForm/>}    />
    <Route path="/verify-otp"  element={<OTPValidation/>}    />

    </Route>

 <Route element={<AdminAuthLayout/>}>
    <Route path="/adminlogin"  element={<AdminloginForm/>}    />

  </Route>
    {/* private routes}*/}
    <Route element={<RootLayout/>}>

  

    <Route path='/home' index element={<Home/>} />
    <Route path="/explore" element={<Explore/>}/>
    <Route path="/saved" element={<Saved/>}/>
    <Route path="/people" element={<People/>}/>
    <Route path="/create-post" element={<CreatePost/>}/>
    <Route path="/update-post/:id" element={<EditPost/>}/>
    <Route path="/posts/:id" element={<PostDetails/>}/>
    <Route path="/profile/:id/*" element={<Profile/>}/>
    <Route path="/update-profile/:id" element={<UpdateProfile/>}/>

      </Route>
    <Route path='/admin' index element={<AdminLayout/>} />
    
    </Routes>



 </main>
  )
}

export default App