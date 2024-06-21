import  {useNavigate,useParams} from "react-router-dom"
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { UseSelector, useSelector } from "react-redux"
import { UserData } from "@/utils/interfaces/interface"
import { useEffect } from "react"
import axios from "axios"
import useConversation from "@/zustand/useConversation"
import toast from "react-hot-toast"


const VideoCall = () => {
    console.log("hiiiiiiii")
    const navigate = useNavigate()
    const {roomId} = useParams()
    const userData = useSelector((state:UserData) => state.persisted.user.userData)
    const {selectedConversation} = useConversation()
    console.log("the selected conversation",selectedConversation)
    console.log("the id is",selectedConversation?._id)
console.log("before use effect")
    useEffect(() => {
        console.log("entered to use effect")
        axios.post(`http://localhost:3000/api/videocall/${selectedConversation?._id}`,
            {senderId:userData?.finduser?._id,roomId},{
                withCredentials:true
            }
        ) 
        .then((res) => {
            console.log("the res",res.data)
             toast.success(res.data.message)
        })
        .catch((error) =>{
            console.log("{error",error)
        })
    },[roomId,selectedConversation?._id,userData?.finduser?._id])

    const call = async(element:any) => {
        console.log("element",element)
        console.log("the username",userData.finduser.basicInformation.username)
        const appId = 229455199
        const serverSecret = "debaa23c9731c496642057b6479c6d21"
        const kitToken =ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            roomId,
            Date.now().toString(),
            userData.finduser.basicInformation.username
        )

        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
         container:element,
         scenario:{
            mode:ZegoUIKitPrebuilt.OneONoneCall
         },
         sharedLinks:[
            {
                url:window.location.origin + window.location.pathname
            }
         ],
         onLeaveRoom:() => {
            navigate("/chat")
         }
        })

    }
    return(
        <div className="app-container">
            <div className="flex justify-center items-center w-screen h-screen bg-gray-200"
            ref={call}/>
        </div>
    )
}

export default VideoCall