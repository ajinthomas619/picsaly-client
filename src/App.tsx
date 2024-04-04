import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import UserRoutes from "./Routes/userRoutes";
import './globals.css'



function App() {
  return(
    <>
  
      <Routes>
   <Route path="/*" element={<UserRoutes/>}/>
      </Routes>
    
    
    
    </>
  )
}
export default App