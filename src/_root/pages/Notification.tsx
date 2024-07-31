import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { linkWithCredential } from "firebase/auth";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";

interface NotificationItem {
  _id: string;
  sender_id: string;
  action_type: string;
  action_details: {
    comment: string;
    post_image: string;
    post_id:any;
  };
  timestamp: string;
  senderUserData?: {
    profile: {
      profileUrl: string;
    };
    basicInformation: {
      username: string;
    };
  };
}

interface NotificationProps {
  setOpenNotification: (open: boolean) => void;
}

const Notification = ({ setOpenNotification }: NotificationProps) => {
  const userData = useSelector((state: any) => state.persisted.user.userData);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenNotification(false);
      }
    },
    [setOpenNotification]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const fetchNotificationOfUser = async () => {
      try {
        const userId = userData.finduser._id;
        console.log("the use rid", userId);
        const response = await axios.get(
          `${BASE_URL}/getNotificationOfUser/${userId}`,
          {
            withCredentials: true,
          }
        );
        console.log("the response is ", response);
        if (response.status === 200) {
          const updatedNotifications = await Promise.all(
            response.data.data.data.data.map(
              async (notificationItem: NotificationItem) => {
                try {
                  const senderUserDataResponse = await axios.get(
                    `${BASE_URL}/getUserById/${notificationItem.sender_id}`,
                    {
                      withCredentials: true,
                    }
                  );
                  if (senderUserDataResponse.status === 200) {
                    return {
                      ...notificationItem,
                      senderUserData: senderUserDataResponse.data.data,
                    };
                  } else {
                    throw new Error(senderUserDataResponse.data.message);
                  }
                } catch (error: any) {
                  toast.error(`Error fetching sender data: ${error.message}`);
                  return null;
                }
              }
            )
          );
          setNotifications(
            updatedNotifications.filter(
              (item): item is NotificationItem => item !== null
            )
          );
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Error fetching notifications");
      }
    };

    fetchNotificationOfUser();
  }, [userData]);

  const clearNotification = async () => {
    const userId = userData.finduser._id;
    const response = await axios.post(
      `${BASE_URL}/clearNotification/${userId}`,
      {
        withCredentials: true,
      }
    );
    if (response.status) {
      setNotifications([]);
      toast.success("Notification Cleared");
    } else {
      toast.error("Error clearing notification");
    }
  };
console.log("notifiactions ",notifications)
  const navigate = useNavigate();

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 flex items-center justify-center z-10 p-4 bg-black bg-opacity-50"
    >
      <div className="w-full sm:w-5/12 md:w-full lg:w-2/5 h-full bg-white rounded-md relative overflow-y-auto shadow-lg">
        <ArrowLeft
          onClick={() => navigate("/")}
          className="absolute top-8 left-6 cursor-pointer text-gray-600 hover:text-black transition-colors duration-200"
        />
        <p className="text-3xl text-center my-6">Notifications</p>
        <div className="flex flex-col justify-center gap-2 p-1">
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <>
                <div
                  className="w-full h-20 flex justify-between border rounded-md flex-none"
                  key={item._id}
                >
                  <div className="h-full w-3/12 flex justify-normal items-center p-2">
                  <Link to={`/profile/${item.senderUserData?._id}`}>
                    <img
                      src={`${import.meta.env.VITE_APP_BASE_URL}/profile/${item.senderUserData?.profile?.profileUrl}`}
                      className="w-10 h-10 lg:w-[50px] lg:h-[50px] rounded-full border border-[#C1506D]"
                      alt={`${item.senderUserData?.basicInformation?.username}'s profile`}
                    />
                    </Link>
                  </div>
                  <div className="h-full w-full flex flex-col">
                    <div className="w-full h-1/2 flex pl-2 justify-start items-end">
                      <p className="font-semibold">
                        {item.senderUserData?.basicInformation?.username}
                      </p>
                    </div>
                    <div className="w-full h-1/2 items-start flex flex-col pl-3">
                      {item.action_type === "like" && (
                        <p className="text-sm">Liked your post</p>
                      )}
                      {item.action_type === "comment" && (
                        <p className="text-sm flex flex-wrap">
                          Commented on your post:{" "}
                          {item.action_details.comment.length > 4
                            ? `${item.action_details.comment.substring(
                                0,
                                4
                              )}...`
                            : item.action_details.comment}
                        </p>
                      )}
                      {item.action_type === "follow" && (
                        <p className="text-sm"> followed you</p>
                      )}
                      <p className="text-[10px]">
                        {moment(item.timestamp).fromNow()}
                      </p>
                    </div>
                  </div>
                  {(item.action_type === "like" ||
                    item.action_type === "comment") && (
                    <div className="h-full w-3/12 p-2 flex justify-center items-center">
                      <Link to={`/post/${item.action_details?.post_id}`}>
                      <img
                        src={item.action_details.post_image}
                        className="w-full h-full object-cover"
                        alt="Post"
                      />
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ))
          ) : (
            <div className="w-full h-20 flex justify-between border rounded-md">
              <div className="h-full w-full flex justify-center items-center">
                <p className="flex text-[#C1506D] text-sm font-semibold">
                  No Notifications For You
                </p>
              </div>
            </div>
          )}
        </div>
        {notifications.length > 0 && (
          <Button
            className="btn-sm mt-48 ml-48 mr-48"
            onClick={clearNotification}
          >
            Clear Notification
          </Button>
        )}
      </div>
    </div>
  );
};

export default Notification;
