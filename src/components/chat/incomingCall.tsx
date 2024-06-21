import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CallDetails {
    sender:{
        profilePicture:string
        username:string
    }
    roomId:string
}

const IncomingCall = ({callDetails}:{callDetails:CallDetails | null}) => {
    const navigate = useNavigate()
    const [showModal,setShowModal] = useState(true)

    const onAcceptCall = () => {
        if(callDetails){
navigate(`/videocall/${callDetails.roomId}`)
        }
        setShowModal(false)
    }

   const onRejectCall = () => {
  setShowModal(false)
    }
    if(!callDetails || !showModal){
        return null
    }

    const {sender} = callDetails

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-bold mb-4">Incoming Call</h2>
          <div className="flex items-center space-x-4">
            <img src={sender.profilePicture} alt="Caller Profile" className="h-12 w-12 rounded-full" />
            <span className="font-semibold">{sender.username}</span>
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-4" onClick={onAcceptCall}>Accept</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={onRejectCall}>Reject</button>
          </div>
        </div>
      </div>
    )
}

export default IncomingCall