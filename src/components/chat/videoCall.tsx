import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";
import axios from "axios";
import useConversation from "@/zustand/useConversation";
import toast from "react-hot-toast";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";

const VideoCall: React.FC = () => {
    const navigate = useNavigate();
    const { roomId } = useParams<{ roomId: string }>();
    const userData = useSelector((state: UserData) => state.persisted.user.userData);
    const { selectedConversation } = useConversation();

    useEffect(() => {
        if (!selectedConversation || !userData) return;

        axios.post(`${BASE_URL}/videocall/${selectedConversation._id}`, {
            senderId: userData.finduser._id,
            roomId
        }, {
            withCredentials: true
        })
        .then((res) => {
            toast.success(res.data.message);
        })
        .catch((error) => {
            console.error("Error during video call setup:", error);
        });
    }, [roomId, selectedConversation, userData]);

    const call = async (element: HTMLDivElement | null) => {
        if (!element || !userData) return;

        const appId = 705283306;
        const serverSecret = "81ffe8feeb8efdadcd05925b1d298a49";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            roomId!,
            Date.now().toString(),
            userData.finduser.basicInformation.username
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            sharedLinks: [
                {
                    url: window.location.origin + window.location.pathname
                }
            ],
            onLeaveRoom: () => {
                navigate("/message");
            }
        });
    };

    return (
        <div className="app-container">
            <div 
                className="flex justify-center items-center w-screen h-screen bg-gray-200" 
                ref={call} 
            />
        </div>
    );
};

export default VideoCall;
