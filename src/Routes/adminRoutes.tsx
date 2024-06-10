import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/_root/pages/adminLayout";
import AdminHome from "@/admin/components/AdminHome";
import UserManagement from "@/admin/components/UserManagement";
import PostManagement from "@/admin/components/PostManagement";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/" element={<AdminHome />} />
                <Route path="user-management" element={<UserManagement />} />
                <Route path="post-management" element={<PostManagement />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
