import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { updateUser } from "@/redux/slices/userSlices";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";

const Follow = ( {id, currentUserId,fetchSuggestedUsers}:any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [followUser, setFollowUser] = useState(false);
  const userData = useSelector((state:any) => state.persisted.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getUserById/${id}`,
          {
            withCredentials:true
          }
        );
      

        setCurrentUser(response.data.data);
        if (
          response.data.data?.socialConnections?.Following?.includes(currentUserId)
        ) {
          setFollowUser(true);
        }
      } catch (error) {
        console.error("Error while fetching user data", error);
      }
    };
    fetchUserData();
  }, [id, currentUserId]);

  const follow = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/followUser`,
        {
          currentUserId: id, 
          followedUserId: currentUserId
        },{
          withCredentials:true
        }
      );
  

      if (response.data.message === 'Followed successfully') {
        setFollowUser(true);
        dispatch(updateUser({ ...userData, profile: { ...userData.profile } }));
        sendNotification("followUserNotification");
        console.log("fetching")
        fetchSuggestedUsers(userData.finduser._id)
      } else if (response.data.message === 'Unfollowed successfully') {
        setFollowUser(false);
        dispatch(updateUser({ ...userData, profile: { ...userData.profile } }));
        sendNotification("unfollowUserNotification");
      }
    } catch (error) {
      console.log("error following/unfollowing user", error);
    }
  };

  const sendNotification = async (message:any) => {
    const data = {
      sender_id: userData.finduser._id,
      receiver_id: currentUserId,
      notificationType: 'follow',
    };

    try {
      const response = await axios.post(`${BASE_URL}/notification`, {
        message,
        data,
      });

    

      if (response.status === 200) {
        console.log("Notification sent successfully");
      } else {
        console.error("Sending notification failed");
      }
    } catch (error) {
      console.error("Error while sending notification:", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <Button
      type="button"
      className="shad-button_primary px-8"
      onClick={follow}
    >
      {followUser ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Follow;
