import { Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";

const protectedAuthroute = ({children}:{children:any}) => {
    const token = useSelector((state:any) => state.persisted.token.token)
    if(token){
        return children
    }
    else{
        return <Navigate to='/login' />
    }
}
export default protectedAuthroute