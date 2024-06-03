import React, { useEffect, useRef } from "react";
import useGetMessages from "@/hooks/useGetMessages";
import MessageSkeleton from "./MessageSkelton";
import Message from "./Message";
import useListenMessages from "@/hooks/useListenMessages";

const Messages: React.FC = () => {
    const { messages, loading } = useGetMessages();
    console.log("before use listen messages");
    
 
    console.log("after use listen messages");
    
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            { messages.length && (
                
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
