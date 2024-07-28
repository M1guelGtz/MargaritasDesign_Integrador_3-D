import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../Context/UserContext";

function RouteProtectedUser() {
    const value = useContext(UserContext)
    
    return ( value.user.id && value.user.rol == '1' ? <Outlet/> : <Navigate to="/"/> );
}

export default RouteProtectedUser;