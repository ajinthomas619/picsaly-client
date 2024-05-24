import { Link, useParams } from "react-router-dom"
import { Button } from "../ui/button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { User } from "lucide-react"

import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react"
import { getUser,clearUser } from '@/redux/slices/userSlices'
import { UserData } from '@/utils/interfaces/interface'
import Search from "./Search"


const Topbar = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector( (state : UserData )=> state.persisted.user.userData);

  useEffect(() => {
    dispatch(getUser(  )); 
  }, []);
  const navigate = useNavigate()
  const logout =async()=>{
      try{
        axios.get("http://localhost:3000/api/logout")
        navigate('/log-in')
        dispatch(clearUser(currentUser))
        
      }
      catch(error){
        console.log(error)
      }
  }
  return (
   <section className="topbar ">
    <div className="flex flex-row  justify-between py-4 px-5">
     <Link to="/" className='flex gap-3 items-center'>
     <img src="/assets/logo.png"
      alt="logo"
      width={130}
      height={325}
      />
     </Link>
     <Search/>
     <div className="flex gap-4 " >
        <Button variant="ghost" className="shad-button_ghost" onClick={logout}> Logout</Button>

       <Link to= {`/profile/${currentUser?.finduser._id} `} className="flex-center gap-3">
       <User className="h-8 w-8 rounded-full"/>
        {currentUser.finduser.basicInformation.username}
        </Link>
     </div>

    </div>



   </section>
  )
}

export default Topbar