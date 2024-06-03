import { useEffect, useState } from "react";
import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";
import {  useSelector } from "react-redux";
import {Message,UserData } from "@/utils/interfaces/interface";
import axios from "axios";
import toast from "react-hot-toast";

const useListenMessages = () => {

    const {socket} = useSocketContext()
    const {
        messages,
        setMessages,
        selectedConversation,
        setUnreadMessages,
        unreadMessages,
        setReload
    } = useConversation()

    const userData = useSelector(
        (state:UserData) => state.persisted.user.userData
    )
    console.log("the user data",userData)
    console.log("the selected conversation",selectedConversation)
    useEffect(() => {
        const handleNewMessage = (newMessage:Message) => {
            console.log("the message recieved",newMessage )
            newMessage.shouldShake = true
            if(selectedConversation?._id !== newMessage.senderId){
                toast("New message Recived",{
                    icon:"📩"
                })
                setUnreadMessages([newMessage])
            }
            (async () => {
                try{
                    const response = await axios.post(`http://localhost:3000/api/get-messages/${selectedConversation._id}`,{
                        senderId:userData.finduser._id
                    },{
                        withCredentials:true
                    })
                    console.log("ther response is",response)
                    setMessages(response.data)
                }
                catch(error){
                    console.log(error)
                }
            })()
            setMessages([...messages,newMessage])
            setReload(true)
          
        }
        
        socket?.on("newMessages",handleNewMessage)
        return () => {
            if(socket){
                socket.off("newMessages",handleNewMessage)
            }
           
        }
    },[socket,
        setMessages,
        messages,
        selectedConversation?._id,
        userData.finduser,setUnreadMessages,unreadMessages])
     
}
export default useListenMessages