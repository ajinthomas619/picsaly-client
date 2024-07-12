import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Assuming you are using React Router for navigation

const People = () => {
  const [users, setUsers] = useState([]);
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const id = userData.finduser._id;

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      navigate("/people");
    } else {
      navigate("/log-in");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("user data", userData);
       
        console.log("the user id", id);
        const res = await axios.get(`http://localhost:3000/api/getAllUsers/${id}`,{withCredentials:true});
        console.log("the actual response", res);
        console.log("all users", res.data.data);
        setUsers(res.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchData();
  }, [userData]);

  return (
    <div className="common-container mx-auto max-w-4xl p-4 mt-20">
      <div className="user-container bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">All Users</h2>
        <ul className="user-grid space-y-4">
          {users.map(user => (
            <li 
              key={user?._id} 
              className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-150 ease-in-out flex items-center gap-4"
            >
              {user?.profile?.profileUrl && (
                <Link to={`/profile/${user?._id}`} className="shrink-0">
                <img 
                  src={`http://localhost:3000/profile/${user.profile.profileUrl}`} 
                  alt={`${user?.basicInformation?.username}'s profile`} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                </Link>
              )}
              <div className="flex flex-row items-center gap-4 w-full">
                <p className="font-medium text-lg text-gray-900">{user?.basicInformation?.email}</p>
                <p className="text-sm text-gray-600">{user?.basicInformation?.username}</p>
                
                   
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default People;
