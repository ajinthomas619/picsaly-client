import {useDispatch,useSelector} from "react-redux"
import { Button } from "../ui/button"
import { useEffect,useState } from "react"
import axios from "axios" 
import { useParams } from "react-router-dom"
import { Loader } from "lucide-react";

const Follow = (id:any,currentUserid:any) => {
    const [currentUser,setCurrentUser] = useState({})
    const [followUser,setFollowUser] = useState(false)


    


   

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                  `http://localhost:3000/api/getUserById/${id}`
                );
             
                setCurrentUser(response.data.data);
                if (
                  response.data.data?.socialConnections?.Followers?.includes(currentUserid)
                ) {
                  setFollowUser(true);
                }
              } catch (error) {
                console.error("Error while fetching user data", error);
              }
              fetchUserData()
        }
    },[id,currentUserid])

    const follow = async () => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/followUser",
            {
              currentUserId: id.currentUserId,
              followedUserid: id.id,
            }
          );
          console.log("the response is", response);   if (response.status) {
            setFollowUser((prev) => !prev);
          }
        } catch (error) {
          console.log("error following user", error);
        }
      };
    
      if (!currentUser) {
        return (
          <div className="flex flex-center w-full h-full">
            <Loader />
          </div>
        );
      }

      return (
        <>
        <Button
                  type="button"
                  className="shad-button_primary px-8"
                  onClick={follow}
                >
                  {followUser ? "Unfollow" : "Follow"}
                </Button>
        
        </>
      )
}

export default Follow