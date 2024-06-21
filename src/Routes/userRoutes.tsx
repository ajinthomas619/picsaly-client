import AuthLayout from '../_auth/AuthLayout';
import SigninForm from '../_auth/forms/SigninForm';
import SignupForm from '../_auth/forms/SignupForm';
import OTPValidation from '../_auth/otp-validation';
import RootLayout from '../_root/RootLayout';
import AdminLayout from '../_root/pages/adminLayout';
import { CreatePost, EditPost, Explore, Home, LikedPost, People, PostDetails, Profile, Saved, UpdateProfile } from '../_root/pages';
import '../globals.css';
import { Routes, Route } from 'react-router-dom';
import AdminAuthLayout from '../_auth/AdminAuthLayout';
import AdminloginForm from '../_auth/forms/AdminloginForm';
import ProtectedRoute from './protectedRoute'; // Ensure the import path matches where your ProtectedRoute component is located
import ChatScreen from '@/_root/pages/ChatScreen';
import useListenMessages from '@/hooks/useListenMessages';
import IncomingCall from '@/components/chat/incomingCall';
import VideoCall from '@/components/chat/videoCall';
import useListenToVideoCalls from '@/hooks/useListentoVideoCalls';
import { useState, useEffect } from 'react';
import Notification from '@/_root/pages/Notification';

const UserRoutes = () => {
  useListenMessages();
  const callDetails = useListenToVideoCalls();
  const [showIncomingCallModal, setShowIncomingCallModal] = useState(false);

  useEffect(() => {
    console.log("the casll details",callDetails)
    if (callDetails) {
      setShowIncomingCallModal(true);
    }
  }, [callDetails]);

  return (
    <main className="flex h-screen">
      {showIncomingCallModal && <IncomingCall callDetails={callDetails} />}
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/log-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/verify-otp" element={<OTPValidation />} />
        </Route>

        <Route element={<AdminAuthLayout />}>
          <Route path="/adminlogin" element={<AdminloginForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/people" element={<People />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/message" element={<ChatScreen />} />
          <Route path="/videocall/:roomId" element={<VideoCall />} />
          <Route path="/notifications" element={<Notification />} />
          
        </Route>

        {/* Protecting Admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" index element={<AdminLayout />} />
        </Route>
      </Routes>
    </main>
  );
};

export default UserRoutes;
