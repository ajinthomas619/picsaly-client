import React from "react";
import {  useSelector } from "react-redux";
import { Link,Route,Routes } from "react-router-dom";

const protectedRoute = ({path,element}:any) => {
    console.log("surprise ptotected route here")
    const token = useSelector((state:any) => state.persisted.token.token)
    
    return(
        <React.Fragment>
            {token?(
             <Routes>
                <Route path={path} element={element}/>
             </Routes>
            ):(
                <Link to='/login'/>
            )}
        </React.Fragment>
    )
}
export default protectedRoute