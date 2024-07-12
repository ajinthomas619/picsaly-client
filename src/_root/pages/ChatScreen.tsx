import MessageContainer from "@/components/chat/MessageContainer";
import Sidebar from "@/components/chat/SideBar";

const ChatScreen = () => {
    return (
        <div className="fixed inset-0 flex justify-center h-1/2  pt-20 sm:pt-24 md:pt-28 lg:pt-32 px-4 sm:px-8 md:px-12 lg:px-16 ">
            <div className="flex flex-col md:flex-row w-full max-w-7xl md:ml-48">
                <div className="flex-none w-1/4 md:w-1/3 lg:w-1/4">
                    <Sidebar />
                </div>
                <div className="flex-grow w-full  md:w-2/3 lg:w-3/4   ">
                    <MessageContainer />
                </div>
            </div>
        </div>
    );
}

export default ChatScreen;
