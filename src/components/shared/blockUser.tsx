import axios from "axios"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../ui/button"
import { updateUser } from "@/redux/slices/userSlices"
import { BASE_URL } from "@/utils/api/baseUrl/axios.baseUrl"

const BlockUser = ({id,currentUserId}:any) => {

  const [currentUser,setCurrentUser] = useState(null)
  const [blockUser,setBlockUser] = useState(false)
  const userData = useSelector((state:any) => state.persisted.user.userData)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserData = async() => {
    try {
        const response = await axios.get(
            `${BASE_URL}/getUserById/${id}`,
            {
              withCredentials:true
            }
          );
          setCurrentUser(response.data.data)
          if(response.data.data?.socialConnections?.blockedUsers?.includes(currentUserId)){
          setBlockUser(true)
     
          }
    } catch (error) {
        console.error("error fetching user data",error)
    }
}
fetchUserData()
  },[id,currentUserId])
  const blockUserHandler = async() => {
    try{
        if(!blockUser){
            const response = await axios.post(`${BASE_URL}/blockuser`,{
                userId:id,
                blockUserId:currentUserId
            },{withCredentials:true})
            if(response.status){
                setBlockUser(true)
                dispatch(updateUser({ ...userData, profile: { ...userData.profile } }));
            }
        }
        else{
            const response = await axios.post(`${BASE_URL}/unblockuser`,{
                userId:id,
                unblockUserId:currentUserId
        },{
            withCredentials:true
        })
        if(response.status){
            setBlockUser(false)
            dispatch(updateUser({ ...userData, profile: { ...userData.profile } }));
        }
    }
  }
  catch(error){
    console.log("error in block operation",error)
  }
}

if (!currentUser) {
    return (
      <div className="flex flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <Button
      type="button"
      className="shad-button_primary px-8"
      onClick={blockUserHandler}
    >
      {blockUser ? "UnBlock" : "Block"}
    </Button>
  );
}


export default BlockUser