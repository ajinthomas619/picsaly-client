import { useState } from "react";
import useConversation from "@/zustand/useConversation";
import toast from "react-hot-toast"
import axios from "axios";
import { useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";

const useSendMessage = () => {
    console.log("useSendMessage")
    const [loading,setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();
    const userData = useSelector(
        (state:UserData) => state.persisted.user.userData
    )
  
    const sendMessage =async(message:any) => {  
        console.log("send message")
    setLoading(true)
    console.log("loading initiated")
    try {
        const response = await axios.post(`http://localhost:3000/api/send/${selectedConversation._id}`,{
            message,senderId:userData.finduser._id
        },{withCredentials:true})
        console.log("the response of send message is",response)
        const data = response.data.data
        setMessages([...messages,data])
        

    } catch (error) {
    console.log("error in sendMessage",error)
    toast.error("An interrnal server error")
    }
    finally{
        setLoading(false)
    }
}

    return {sendMessage,loading}
}
export default useSendMessage