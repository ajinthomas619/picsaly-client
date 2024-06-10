import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";

import Sidebar from "@/admin/components/Sidebar";
import Navbar from "@/admin/components/Navbar";
import UserManagement from "@/admin/components/UserManagement";
import AdminHome from "@/admin/components/AdminHome";
import PostManagement from "@/admin/components/PostManagement";

const Admin = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex min-h-screen w-full max-w-screen">
        <Navbar />
        <div className="flex flex-1">
          <div className="hidden md:block w-1/5">
            <Sidebar />
          </div>
          <div className="flex-1 bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/post-management" element={<PostManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
