import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { UserData } from "@/utils/interfaces/interface";


type UserCardProps = {
    user:UserData
}

const UserCard = ({user}:UserCardProps) => {
    return(
        <Link to={/profile/ + user._id} className="user-card">
            <img src={user.profilePicture||'public/assets/icons/profile-placeholder.svg'}
            alt='user'
            className="rounded-full w-14 h-14" />
            <div className="flex flex-center flex-col gap-1">
             <p className="base-medium text-light-1 text-center line-clamp-1">
             {user.fullname}
             </p>
             <p className="small-regular text-light-3 text-center line-clamp-1">
                @{user.userName}
             </p>

            </div>
            <Button type='button' size='sm' className="shad-button_primary px-5">
              Follow
            </Button>
            </Link> 
    )
}
export default UserCard