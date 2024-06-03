import { useEffect,useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {  useSelector } from "react-redux";
import { Conversation,UserData } from "@/utils/interfaces/interface";
import useConversation from "@/zustand/useConversation";


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
                console.log("the following",following)

                const response = await axios.post(`http://localhost:3000/api/get-conversations/${userData.finduser._id}`,
                {following},
            {withCredentials:true}
        )
   
        const data = response.data
      
        
        setConversations(data)
        console.log("conversations",response.data)
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
    },[userData])
    return{loading,conversations}
}

export default useGetConversations