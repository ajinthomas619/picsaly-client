import { useState } from "react";
import useConversation from "@/zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const userData = useSelector((state: UserData) => state.persisted.user.userData);
    

    const sendMessage = async (message: string, file?: File) => {
        setLoading(true);

        try {
            let response;
            if (file) {
                // If a file is present, use the file upload endpoint
                const formData = new FormData();
                formData.append("message", message);
                formData.append("senderId", userData.finduser._id);
                formData.append("file", file);

                response = await axios.post(
                    `${BASE_URL}/sendFile/${selectedConversation._id}`,
                    formData,
                    { withCredentials: true }
                );
            } else {
                
                const payload = {
                    message,
                    senderId: userData.finduser._id
                };

                response = await axios.post(
                    `${BASE_URL}/send/${selectedConversation._id}`,
                    payload,
                    { withCredentials: true }
                );
            }
           


            const data = response.data.data;
            setMessages([...messages, data]);
        } catch (error) {
            console.error("Error in sendMessage:", error);
            toast.error("An internal server error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
