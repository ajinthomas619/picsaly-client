import { useState,useEffect } from "react";
import axios from "axios";
import useConversation from "@/zustand/useConversation";
import toast from "react-hot-toast";
import {  useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";

const useGetMessages = () => {
    const [loading,setLoading] = useState(false)
    const {messages,setMessages,selectedConversation} = useConversation()
    const userData = useSelector(
        (state:UserData) => state.persisted.user.userData
    )

    useEffect(() => {
        const getMessages = async () => {
            if(!selectedConversation?._id){
                setMessages([])
                return
            }
            setLoading(true)
            try{
                const response = await axios.post(`${BASE_URL}/get-messages/${userData.finduser._id}`,{senderId:selectedConversation?._id},{
                    withCredentials:true
                })
      
                setMessages(response.data.conversation.messages || response.data.conversation.messages.savedMessage || [])
                console.log("the messages is",messages)
            }
            catch(error:any){
                console.log("error in getMessages",error)
                setMessages([])
                
            }
            finally{
                setLoading(false)
            }
        }
        
    getMessages()
        },[selectedConversation?._id,setMessages,userData.finduser?._id])
    
    return {messages,loading}
}
export default useGetMessages 