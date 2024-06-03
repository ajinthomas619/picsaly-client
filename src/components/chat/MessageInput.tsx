import { useState } from "react";
import { BiSend } from "react-icons/bi";
import useSendMessage from "@/hooks/useSendMessage";
import useConversation from "@/zustand/useConversation";

const MessageInput = () => {
    const[message,setMessage] = useState("")
    const {sendMessage} = useSendMessage()
    const {setReload,reload} = useConversation()
  

    const handleSubmit = async(e:{preventDefault:() => void}) => {
        e.preventDefault()
        if(!message) return
        await sendMessage(message)
        setReload(!reload)
        setMessage("")
    }


    return(
        <form className="px-4 my-3 flex items-center border-t border-gray-300 pt-3" onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="Type Here"
            className="input input-bordered flex-grow mr-2 bg-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <button 
            type="submit"
            className="btn btn-neutral bg-blue-500 hover:bg-blue-600 text-white"
            
            >
                <BiSend className="text-xl" />
            </button>
        </form>
    )
}
export default MessageInput