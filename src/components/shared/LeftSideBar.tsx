import { Link, NavLink } from "react-router-dom"
import { Button } from "../ui/button"
import axios from "axios"
import { useNavigate,useLocation } from "react-router-dom"
import { User } from "lucide-react"
import { sidebarLinks } from "@/constants"
import { UserData } from "@/utils/interfaces/interface"
import {  useSelector,useDispatch } from "react-redux"
import { clearUser } from '@/redux/slices/userSlices'



const LeftSideBar = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const userData = useSelector( (state : UserData )=> state.persisted.user.userData);

  const navigate = useNavigate()
  const logout =async()=>{
      try{
        axios.get("http://localhost:3000/api/logout")
        navigate('/log-in')
        dispatch(clearUser(userData))
      }
      catch(error){
        console.log(error)
      }
  }
  return (
  <nav className="=leftsidebar md:fixed  ">
    <div className="flex flex-col gap-11 px-2">
    <Link to="/" className='flex gap-3 items-center'>
     {/* <img src="/assets/logo.png"
      alt="logo"
      width={170}
      height={100}
      /> */}

      
     </Link>
     <Link to={`/profile/${userData?.finduser._id}`} className="flex gap-3 items-center">
      <User className="h-14 w-14 rounded-full mt-16"/>
      <div className=" flex flex-col mt-20">
        <p className="body-bold"> {userData.finduser.basicInformation.fullname}</p>
        <p className="small-regular text-light-3">{userData.finduser.basicInformation.username}</p>


      </div>

     </Link>
     <ul className="flex flex-col gap-6">
    {sidebarLinks.map((link:INavLink)=> {
      const isActive = pathname === link.route
      return (
        <li key={link.label} className={`leftsidebar-link ${
          isActive && 'bg-purple-100'
        }`}>
        <NavLink to={link.route} className="flex gap-4 items-center p-4">
        <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white
        ${isActive && 'invert-white'}`}/>
        {link.label}

        </NavLink>
        </li>
      )
      })}



     </ul>
    


    </div>
    <Button variant="ghost" className="shad-button_ghost" onClick={logout}> Logout</Button>


  </nav>
  )
}

export default LeftSideBar