import { useEffect,useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {  useSelector } from "react-redux";
import { Conversation,UserData } from "@/utils/interfaces/interface";
import useConversation from "@/zustand/useConversation";
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl";


interface GetConversationsResponse {
    conversations:Conversation;
    users:UserData[];
}


const useGetConversations = () => {
    const [loading,setLoading] = useState<boolean>(false)
    const [conversations,setConversations] = useState<[Conversation]>()
    const userData = useSelector( (state : UserData )=> state.persisted.user.userData);
    const {messages} = useConversation()                    


    useEffect(() => {
        const getConversations = async() =>{
            setLoading(true)
            try{
                const following = userData.finduser.socialConnections.Following
                

                const response = await axios.post(`${BASE_URL}/get-conversations/${userData.finduser._id}`,
                {following},
            {withCredentials:true}
        )

        console.log("the response",response)
   
        const data = response.data
        console.log("the data of get conversation",data)
      
        
        setConversations(data)
       
        if(data.error){
            throw new Error(data.error)
        }
            }
            catch(error){
                console.log(" an error occured",error)
                toast.error("internal server error")
            }
            finally{
                setLoading(false)
            }
        }
        getConversations()
    },[userData.finduser.socialConnections.Following,messages])
    return{loading,conversations}
}

export default useGetConversations