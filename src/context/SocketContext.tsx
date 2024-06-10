import React,{createContext,useState,useEffect,useContext} from "react";
import io,{Socket} from "socket.io-client"
import {  useSelector } from "react-redux";
import { UserData } from "@/utils/interfaces/interface";

interface SocketContextType {
    socket:Socket | null;
    onlineUsers : string[]
}

const SocketContext = createContext<SocketContextType>({
    socket:null,
    onlineUsers:[]
})

export const useSocketContext  = () => {
    return useContext(SocketContext)
}

 const SocketContextProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    const userData = useSelector( (state : UserData )=> state.persisted.user.userData);
    console.log("the userData",userData)

    useEffect(() => {
        let newSocket : Socket | undefined = undefined

        if(userData){
            const userId = userData?.userData?.userData?.finduser?._id || userData?.userData?.finduser?._id;
            newSocket = io("http://localhost:3001",{
                query:{
                    userId:userId,
                }
              
            })
            setSocket(newSocket)
            
            newSocket.on("getOnlineUsers",(users:any) => {
                setOnlineUsers(users)
            })
        }
        return () => {
            if(newSocket){
                newSocket.close()
            }
        }
    },[userData])
    console.log("the socket",socket)
    return (
    <SocketContext.Provider value={{socket,onlineUsers}}>
        {children}
    </SocketContext.Provider>
    )
}
export default SocketContextProvider