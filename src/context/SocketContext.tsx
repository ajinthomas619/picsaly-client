import React, { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    onlineUsers: []
});

export const useSocketContext = () => {
    return useContext(SocketContext);
};

const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const userData = useSelector( (state : UserData )=> state.persisted.user.userData);
    console.log("th useer daata",userData)

    useEffect(() => {
        if (userData) {
            const userId =  userData?.finduser?._id
            const newSocket = io("http://localhost:3001", {
                query: {
                    userId: userId,
                }
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users: string[]) => {
                setOnlineUsers(users);
            });

            return () => {
                newSocket.close();
            };
        }
    }, [userData]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
