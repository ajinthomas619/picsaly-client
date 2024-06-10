import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { addUser } from "@/redux/slices/userSlices";
import toast from "react-hot-toast";

const EditProfile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    email: "",
    });
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
  
    
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getUserById/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error in finding user", error);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.data?.basicInformation?.username || "",
        bio: user?.data?.profile?.Bio || "",
        email: user?.data?.basicInformation?.email || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username) {
      toast.error("Username is required");
      return;
    }
    if (formData.username.length < 3 || formData.username.length > 20) {
      toast.error("Username must be between 3 and 20 characters long");
      return;
    }
    try {
      const userId = user?.data?._id;
      if (!userId) {
        throw new Error("User ID is not available");
      }

      await axios.post(`http://localhost:3000/api/editProfile/${userId}`, formData, {
        withCredentials: true,
      });
  console.log("afferreer axios",formData)
      dispatch(addUser(formData));
      navigate("/");
      setShowModal(false);
    } catch (error) {
      console.log("Error in edit user", error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Edit Profile
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-md">
            <span className="text-gray-600 text-lg font-bold mb-4 block">Edit Profile</span>
            <span className="absolute top-2 right-2 cursor-pointer" onClick={() => setShowModal(false)}>&times;</span>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  disabled
                  placeholder="email"
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  placeholder="A little bit about yourself"
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  placeholder="Username"
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
