import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Follow from "./Follow";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";
import { Loader } from "lucide-react";

const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Access the userData directly from the state
  const userData = useSelector((state:any) => state.persisted.user.userData);
  const fetchSuggestedUsers = async (id: string) => {

    try {
      const res = await axios.get(`${BASE_URL}/getSuggestedUsers/${id}`, {
        withCredentials: true,
      });
      console.log("Fetched suggested users data:", res.data.data);
      setUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } 
  };

  useEffect(() => {
    if (userData && userData.finduser && userData.finduser._id) {
      console.log("User data available, fetching suggested users.");
      fetchSuggestedUsers(userData.finduser._id);
    } else {
      console.log("No user data available.");
    
    }
  }, []);



  return (
    <div className="common-container mx-auto max-w-4xl p-4 mt-20 ml-24 fixed w-1/5 mb-36">
      <div className="user-container bg-white shadow-md rounded-lg p-4 overflow-scroll h-screen mb-36">
        <h2 className="text-xl font-semibold mb-4">Suggested Users</h2>
        <ul className="user-grid space-y-4 mb-16">
          {users.map((user) => (
            <li
              key={user?._id}
              className="bg-white rounded-lg p-4 mb-3 shadow-sm hover:bg-purple-100 transition duration-150 ease-in-out"
            >
              <div className="flex flex-row items-center gap-4 w-full mb-4">
                {user?.profile?.profileUrl && (
                  <Link to={`/profile/${user?._id}`} className="shrink-0">
                    <LazyLoadImage
                      src={`${import.meta.env.VITE_APP_BASE_URL}/profile/${user.profile.profileUrl}`}
                      alt={`${user?.basicInformation?.username}'s profile`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </Link>
                )}
                <p className="font-medium text-lg text-gray-900">
                  {user?.basicInformation?.username}
                </p>
              </div>
              <Follow id={userData.finduser._id} currentUserId={user._id} fetchSuggestedUsers={fetchSuggestedUsers} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuggestedUsers;
