
import { useSelector } from "react-redux";
import { Route, Link } from "react-router-dom";

const ProtectedRoute = ({ path, element }: any) => {
    const userData = useSelector((state: any) => state.persisted.user.userData);
    
  
    if (userData) {
        return <Route path={path} element={element} />;
    }

   
    return <Link to='/log-in'>Log In</Link>;
}

export default ProtectedRoute;
