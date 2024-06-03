import React from "react";
import { extractTime } from "@/utils/extractTime";

interface Props {
  message: {
    senderId: string;
    createdAt: string;
    message: String;
    shouldShake: boolean;
    _id?: string;
  };
}

const MessageSkeleton: React.FC<Props> = ({ message }) => {
  const formattedTime = extractTime(message.createdAt);
  const chatClassName =
    message.senderId === "authUserId" ? "chat-end" : "chat-start";
  const profilePic =
    message.senderId === "authUserId"
      ? "authUser.profilePic"
      : "otherUser.profilePic";
  const bubbleBgColor = message.senderId === "authUserId" ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
        <div
          className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
        >
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
