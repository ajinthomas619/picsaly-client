import useConversation from "@/zustand/useConversation";
import MessageInput from "./MessageInput";
import { Link } from "react-router-dom";
import Messages from "./Messages";
import { Video } from "lucide-react";
import { generateRandomRoomId } from "@/helper/roomIdCreator";

const MessageContainer = () => {
    const roomId = generateRandomRoomId();
    const { selectedConversation } = useConversation();

    console.log("the selected conversation", selectedConversation);

    return (
        <div className="bg-indigo-100 px-4 py-2 mb-16 md:h-[700px] flex flex-col h-1/2 sm:mb-16">
            {selectedConversation ? (
                <div className="flex-1 flex flex-col  h-[300px] mb-36 ">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl">To: {
                         // @ts-ignore
                        selectedConversation?.username}</span>
                        <div>
                            <Link to={`/videocall/${roomId}`}>
                                <Video className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                            </Link>
                        </div>
                    </div>
                    <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-y-scroll">
                        <Messages />
                    </div>
                    <MessageInput />
                </div>
            ) : (
                <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
                    <NoChatSelected />
                </div>
            )}
        </div>
    );
};

export default MessageContainer;

const NoChatSelected = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center text-xs sm:text-sm md:text-lg lg:text-xl text-gray-800 font-semibold flex flex-col items-center gap-2">
                <p>Welcome</p>
                <p>Select a chat to start messaging</p>
            </div>
        </div>
    );
};
