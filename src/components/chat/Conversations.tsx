import React, { useEffect } from "react";
import Conversation from "./Conversation";
import useGetConversations from "@/hooks/useGetConversations";


const Conversations:React.FC = () => {
    const {conversations, loading} = useGetConversations();
  
  

    if(loading || !Array.isArray(conversations) || conversations.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div className="py-2 flex flex-col overFlow-auto">
            {conversations.map((conversation:any ,idx:number) => {
                const key = conversation._id? conversation._id : `fallback_key_${idx}`

                return(
              <Conversation
                key={key}
               conversation = {conversation}
               lastIndex = {idx === conversations.length - 1}
             />
                )
            })}
        </div>
    )
}

export default Conversations