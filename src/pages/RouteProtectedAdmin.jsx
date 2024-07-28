import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../Context/UserContext";

function RouteProtectedAdmin() {
    const value = useContext(UserContext)
    
    return ( value.user.id && value.user.rol == 0 ? <Outlet/> : <Navigate to="/"/> );
}

export default RouteProtectedAdmin;