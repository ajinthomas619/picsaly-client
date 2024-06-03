import MessageContainer from "@/components/chat/MessageContainer";
import Sidebar from "@/components/chat/SideBar";

const ChatScreen = () =>{
    return (
        <div>
            <div className="flex justify-center min-h-screen pt-[100px]">
                <Sidebar/>
                <MessageContainer/>
            </div>
        </div>
    )
}
export default ChatScreen