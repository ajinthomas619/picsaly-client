import { Outlet,Navigate } from "react-router-dom"
import AdminloginForm from "./forms/AdminloginForm"

const AdminAuthLayout = () => {
  const isAuthenticated = false
  return (
    <>
    {isAuthenticated ? (
        <Navigate to="/" />
    ) : (
         <>
         <section className="flex flex-1 justify-center items-center flex-col py-10 ">
          <Outlet/>

         </section>
         <img src="/assets/side-image-1.jpg"
          alt="sideimage"
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />

        
      
         </>
         
    )}
    
    </>
  )
}

export default AdminAuthLayout