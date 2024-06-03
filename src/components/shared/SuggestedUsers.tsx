import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Follow from "./Follow";
import { LazyLoadImage } from 'react-lazy-load-image-component';


const SuggestedUsers = () => {
  const [users, setUsers] = useState([]);
  const userData = useSelector((state: any) => state.persisted.user.userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const id = userData.finduser._id;
       
        const res = await axios.get(
          `http://localhost:3000/api/getSuggestedUsers/${id}`
        );
     
        setUsers(res.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchData();
  }, [users]);
  return (
    <>
      <div className="common-container mx-auto max-w-4xl p-4 " >
        <div className="user-container bg-white shadow-md rounded-lg p-4 ">
          <h2 className="text-xl font-semibold mb-4">Suggested Users</h2>
          <ul className="user-grid space-y-4 ">
            {users.map((user) => (
              <li
                key={user?.id}
                className="bg-gray-100 rounded-lg p-4 mb-5 shadow-sm hover:bg-gray-200 transition duration-150 ease-in-out "
              >
                {user?.profile?.profileUrl && (
                  <Link to={`/profile/${user?._id}`} className="shrink-0">
                    <LazyLoadImage
                      src={`http://localhost:3000/profile/${user.profile.profileUrl}`}
                      alt={`${user?.basicInformation?.username}'s profile`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </Link>
                )}
                <div className="flex flex-row items-center gap-4 w-full  ">
                  <p className="font-medium text-lg text-gray-900">
                    {user?.basicInformation?.username}
                  </p>
                  <p className="text-sm text-gray-600 md:textarea-xs " >
                    {user?.basicInformation?.email}
                  </p>
                </div>
                <Follow id={user._id} currentUserId ={userData.finduser._id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SuggestedUsers;
