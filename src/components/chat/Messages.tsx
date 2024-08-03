import React, { useEffect, useRef } from "react";
import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";

const Messages: React.FC = () => {
    const { messages, loading } = useGetMessages();
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length>0) {
            setTimeout(() => {
                lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messages]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (messages.length === 0) {
        return <div></div>;
    }

    return (
        <div  className="px-4 flex-1 overflow-auto">
            {messages.map((message, ind) => {
                const isLastMessage = ind === messages.length - 1;
                return (
                    <div key={ind} ref={isLastMessage ? lastMessageRef : null}>
                        <Message
                         // @ts-ignore
                        message={message} />
                    </div>
                );
            })}
        </div>
    );
};

export default Messages;
