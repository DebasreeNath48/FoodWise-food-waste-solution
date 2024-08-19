import React from "react";
import { Navigate } from "react-router-dom";
import { getRefreshToken } from "../utils/jwt.auth.util";

const LoginLock=({children,needLoggedIn})=>{
    if(needLoggedIn){
        if(!getRefreshToken()) return <Navigate to={`/registration`}/>
        return <>{children}</>
    }
    if(getRefreshToken()) return <Navigate to={`/`}/>
    return <>{children}</>
}

export default LoginLock