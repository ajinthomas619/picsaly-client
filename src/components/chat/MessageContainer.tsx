import useConversation from "@/zustand/useConversation";
import MessageInput from "./MessageInput";
import { Link } from "react-router-dom";
import Messages from "./Messages";
import { Video } from "lucide-react";
import { generateRandomRoomId } from "@/helper/roomIdCreator";


const MessageContainer = () => {
    const roomId = generateRandomRoomId()
    const {selectedConversation} = useConversation()

    console.log("the selected conversation",selectedConversation)
    return (
 <div className="bg-indigo-100 px-4 py-2 mb-2 flex justify-between">
  <span className="labex-text">To:{selectedConversation?.username}</span>
  <div className="">
    <Link to={`/videocall/${roomId}`}>
    <Video/>
    </Link>
  </div>
  <div className="px-4 flex-1">
    <div className="h-[500px] overflow-y-scroll">
        <Messages/>
    </div>
    <MessageInput/>
  </div>

    <NoChatSelected />



 </div>
    )
}
export default MessageContainer


const NoChatSelected = () => {
    return(
        <div className="flex items-center justify-center w-full h-full border-black">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-800 font-semibold flex flex-col items-center gap-2">
                <p>Welcome</p>
                <p>Select a chat to start messaging</p>
            </div>
        </div>
    )
}