import React, { useEffect } from "react";
import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";
import { UserData } from "@/utils/interfaces/interface";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import FullScreen from "../shared/FullScreen";

interface Props {
  message: {
    senderId: string;
    createdAt: string;
    message?: string;
    imgURL?: string;
    shouldShake: boolean;
  };
}

const Message: React.FC<Props> = ({ message }) => {
  console.log("the message", message);

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const { selectedConversation, removeMessage } = useConversation();
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

  const handleDeleteMessage = async () => {
    confirmAlert({
      title: "Delete Message?",
      message: "Are you sure You want to delete the message 🙂",
      buttons: [
        {
          label: "Delete 🗑️",
          onClick: async () => {
            try {
              const response = await axios.delete(
                `http://localhost:3000/api/deleteMessage/${message._id}`
              );
              if (response.status) {
                removeMessage(message._id);
                console.log("message deleted");
                return { status: response.status, message: response.message };
              } else {
                return { status: response.status, message: response.message };
              }
            } catch (error) {
              console.log("error in deleting messages", error);
            }
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} max-w-lg break-words whitespace-pre-wrap`}
      >
        {message.message ? (
          message.message
        ) : message.imgURL ? (
          <Link to={`/full-screen/${message.imgURL}`}>
            <img
              src={`http://localhost:3000/chat/${message.imgURL}`}
              alt="Sent Image"
              className="max-w-full h-36"
            />
          </Link>
        ) : null}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
      <MdDelete onClick={handleDeleteMessage} />
    </div>
  );
};

export default Message;
