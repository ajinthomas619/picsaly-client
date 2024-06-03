import { useState,useEffect } from "react";
import axios from "axios";
import useConversation from "@/zustand/useConversation";
import toast from "react-hot-toast";
import {  useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";


const useGetMessages = () => {
    const [loading,setLoading] = useState(true)
    const {messages,setMessages,selectedConversation,reload} = useConversation()
    const userData = useSelector(
        (state:UserData) => state.persisted.user.userData
    )

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try{
                const response = await axios.post(`http://localhost:3000/api/get-messages/${userData.finduser._id}`,{senderId:selectedConversation?._id},{
                    withCredentials:true
                })
             
                setMessages(response.data.conversation.messages)
             
            }
            catch(error:any){
                console.log("error in getMessages",error)
          
            }
            finally{
                setLoading(false)
            }
        }
   
        if(selectedConversation?._id) getMessages()
        },[selectedConversation?._id,setMessages,messages])

    return {reload,loading,messages:useConversation((state => state.messages))}
}
export default useGetMessages 