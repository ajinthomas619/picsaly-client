import React, { useEffect } from "react";
import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";
import { UserData } from "@/utils/interfaces/interface";
import { useSelector } from "react-redux";

interface Props {
  message: {
    senderId: string;
    createdAt: string;
    message: string;
    shouldShake: boolean;
  };
}

const Message: React.FC<props> = ({ message }) => {

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const { selectedConversation } = useConversation();
  let fromMe = message.senderId === userData.finduser._id;

  if (!message.senderId) {
    fromMe = true;
  }
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? `http://localhost:3000/profile/${userData.finduser.profile.profileUrl}`
    : `http://localhost:3000/profile/${selectedConversation?.profileUrl}`;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";



  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS caht bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
