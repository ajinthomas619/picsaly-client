import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Follow from "./Follow";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";
const FollowingList = ({userId}) => {
    const [following,setFollowing] = useState([])

    useEffect(() => {
        const fetchFollowing = async() => {
            try {
                const response = await axios.get(`${BASE_URL}/getFollowing/${userId}`,{withCredentials:true})
          
                setFollowing(response.data.data)
            } catch (error) {
                console.error("error in getting following",error)
            }
        }
        fetchFollowing()
    },[userId])
    return(
        <>
        <div className="common-container mx-auto max-w-4xl p-4  ml-20  w-full   " >
          <div className="user-container bg-white  rounded-lg  ">
          <h2 className="text-xl font-semibold mb-4">Following</h2>
            <ul className="user-grid space-y-4 mb-16 ">
              {following.map((user) => (
                <li
                  key={user?.id}
                  className="bg-white rounded-lg p-4 mb-3  hover:bg-gray-200 transition duration-150 ease-in-out "
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
                
                  </div>
                
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
}
export default FollowingList