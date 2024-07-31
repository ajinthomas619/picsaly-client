import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { Bell, User } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getUser, clearUser } from '@/redux/slices/userSlices';
import { UserData } from '@/utils/interfaces/interface';
import Search from "./Search";
import Notification from "@/_root/pages/Notification";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser: UserData = useSelector((state: UserData) => state.persisted.user.userData);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const logout = async () => {
    try {
      await axios.get(`${BASE_URL}/logout`);
      navigate('/log-in');
      dispatch(clearUser(currentUser));
    } catch (error) {
      console.log(error);
    }
  };

  const goToNotifications = () => {
    navigate('/notifications');
  };

  return (
    <section className="topbar bg-slate-100 fixed w-full">
      <div className="flex flex-row justify-between py-1 px-5 gap-2">
        <Link to="/" className='flex gap-3 items-center'>
          <img
            src="/assets/logo.png"
            alt="logo"
            width={36}
            height={36}
          />
        </Link>
        <div className="mt-2">
        <Search  />
        </div>
        <div className="flex gap-4 mt-1">
          <Button variant="ghost" className="shad-button_ghost mt-1" onClick={logout}>Logout</Button>
          {currentUser?.finduser && (
            <Link to={`/profile/${currentUser.finduser._id}`} className="flex-center gap-3 mt-1">
              <User className="h-4 w-4 rounded-full" />
              {currentUser.finduser.basicInformation.username}
            </Link>
          )}
          <Bell onClick={goToNotifications} className="cursor-pointer mt-2" />
        </div>
      </div>
      <Routes>
        <Route path="/notifications" element={<Notification setOpenNotification={() => {}} />} />
      </Routes>
    </section>
  );
};

export default Topbar;
