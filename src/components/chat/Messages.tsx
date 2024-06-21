import React, { useEffect, useRef } from "react";
import useGetMessages from "@/hooks/useGetMessages";
import MessageSkeleton from "./MessageSkelton";
import Message from "./Message";


const Messages: React.FC = () => {
    const { messages, loading } = useGetMessages();
  
    
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        },100)
    }, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {!loading &&
             messages.length && (
                
                messages.map((message, ind) => {
                    const isLastMessage = ind === messages.length - 1;
                    return (
                        <div key={ind} ref={isLastMessage ? lastMessageRef : null}>
                            <Message message={message} />
                        </div>
                    );
                })
            )}
            
            </div>
        );
};

export default Messages;
