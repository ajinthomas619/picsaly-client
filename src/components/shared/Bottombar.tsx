
import { bottombarLinks } from "@/constants"
import { Link,useLocation } from "react-router-dom"

const Bottombar = () => {
  const { pathname} = useLocation()
   return (
   <section className="bottom-bar flex items-center w-screen 
   border border-black bg-gray-100 h-14">
{bottombarLinks.map((link)=> {
      const isActive = pathname === link.route
      return (
        <div >
        <Link to={link.route} key={link.label} className={` ${
          isActive && 'bg-primary-500 rounded-[10px]'
        }  flex items-center flex-col gap-1 p-6 transition`}>
        <img src={link.imgURL} alt={link.label}
        width={20} height={20}
        className={`
        ${isActive && 'invert-white'}`}/>
       <p className="tiny-medium text-light-2">{link.label}</p> 
       
         
        </Link>
        </div>
        
      )
      })}


   </section>
  )
}

export default Bottombar