import { useEffect } from "react";
import UsersPerMonth from "./NewUsersPerMonth";
import PostsPerMonth from "./PostsPerMonth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {

    const admin = useSelector((state:any) => {
        
       return state.persisted.admin.adminData
    })
    const navigate = useNavigate()


      const email = admin.email

      useEffect(() => {
        if(!email){
            navigate('/adminlogin')
        }
       
      })

    return (  
        <div className="flex flex-col justify-center items-center ml-10 mt-10 flex-wrap gap-10">
            <div className=" shadow-sm w-full md:w-full  p-36">
                <PostsPerMonth />
            </div>
            <div className=" shadow-sm w-full md:w-full  p-36">
                <UsersPerMonth />
            </div>
        </div>
    );
}

export default AdminHome;
