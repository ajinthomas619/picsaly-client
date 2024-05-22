import React from "react";
import { useSelector } from "react-redux";
import { Route, Link } from "react-router-dom";

const ProtectedRoute = ({ path, element }: any) => {
    const token = useSelector((state: any) => state.persisted.token.token);
    
  
    if (token) {
        return <Route path={path} element={element} />;
    }

   
    return <Link to='/log-in'>Log In</Link>;
}

export default ProtectedRoute;
