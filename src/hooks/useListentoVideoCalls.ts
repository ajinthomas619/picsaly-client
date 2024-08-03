import { useEffect,useState } from "react";
import { useSocketContext } from "@/context/SocketContext";
 // @ts-ignore
import jump from '../../public/assets/jump.mp3'

const useListenToVideoCalls = () => {
    const {socket} = useSocketContext()
    const [callDetails,setCallDetails] = useState(null)

    useEffect(() => {
        console.log("socket video call connected")

        const handleNewVideoCall = (callDetails:any) => {
            console.log("new call recieved",callDetails)
             const sound = new Audio(jump)
             sound.play()
             setCallDetails(callDetails)
        }

        socket?.on("VideoCall",handleNewVideoCall)
    return () => {
        if(socket){
            socket.off("videoCall",handleNewVideoCall)
        }
    }
    },[socket])
    return callDetails

}

export default useListenToVideoCalls