import React, { useEffect } from "react";
import useConversation from "@/zustand/useConversation";
import { useSocketContext } from "@/context/SocketContext";
import { BsCircleFill } from "react-icons/bs";

const Conversation: React.FC<Props> = ({ conversation, lastIndex }) => {

  const { selectedConversation, setSelectedConversation,unreadMessages,setUnreadMessages } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  useEffect(() => {
 
    if (selectedConversation) {
      localStorage.setItem("selectedConversation", selectedConversation._id);
    }
  }, [selectedConversation]);
  

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer mr-2 ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => {

          setSelectedConversation(conversation);
          setUnreadMessages(null);
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={`http://localhost:3000/profile/${conversation?.profileUrl}`} alt="profilePicture" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold px-2 mr-2 text-gray-800">
              {conversation?.username}
            </p>
            {unreadMessages?.senderId === conversation._id && (
              <BsCircleFill fill="red" className="ms-1.5 mt-1.5" />
            )}
          </div>
        </div>             
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
