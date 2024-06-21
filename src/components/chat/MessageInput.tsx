import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import useSendMessage from "@/hooks/useSendMessage";
import useConversation from "@/zustand/useConversation";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { sendMessage } = useSendMessage();
    const { setReload, reload } = useConversation();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!message && !selectedFile){
            toast.error("enter something")
            return;}


        if (selectedFile) {
            await sendMessage(message, selectedFile);
            setSelectedFile(null);
        } else {
            await sendMessage(message);
        }

        setReload(!reload);
        setMessage("");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
           const file = e.target.files[0]
           if(file.size > 50*1024*1024){
            toast.error('file exceeds 50MB')
            return
           }
 

            setSelectedFile(e.target.files[0]);
            
        }
    };

    const handleAddFileClick = () => {
        document.getElementById("fileInput")?.click();
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };

    const renderFilePreview = () => {
        if (selectedFile) {
            const fileUrl = URL.createObjectURL(selectedFile);
            const isImage = selectedFile.type.startsWith("image/");
            
            return (
                <div className="file-preview flex items-center space-x-2 mt-2">
                    {isImage ? (
                        <img src={fileUrl} alt="File preview" className="w-16 h-16 object-cover rounded" />
                    ) : (
                        <span className="text-gray-600">{selectedFile.name}</span>
                    )}
                    <button onClick={handleRemoveFile} className="text-red-500">Remove</button>
                </div>
            );
        }
        return null;
    };

    return (
        <form className="px-4 my-3 flex flex-col border-t border-gray-300 pt-3" onSubmit={handleSubmit}>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Type Here"
                    className="input input-bordered flex-grow bg-white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <IoMdAdd className="text-xl bg-white mr-5 cursor-pointer" onClick={handleAddFileClick} />
                <button
                    type="submit"
                    className="btn btn-neutral bg-blue-500 hover:bg-blue-600 text-white"
                >
                    <BiSend className="text-xl" />
                </button>
            </div>
            {renderFilePreview()}
        </form>
    );
};

export default MessageInput;
