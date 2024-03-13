import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"



const AdminLayout = () => {
    const navigate = useNavigate()
   
        const logout = async () => {
            try {
                await axios.get("http://localhost:3000/api/logout");
                navigate('/adminlogin');
            } catch (error) {
                console.log(error);
            }
        };

    
   
  
  return (
    <div>
        
        
        
        <h1>Admin Page</h1>
        <Button onClick={logout}>LogOut</Button>
      

        
        </div>
  )
}

export default AdminLayout