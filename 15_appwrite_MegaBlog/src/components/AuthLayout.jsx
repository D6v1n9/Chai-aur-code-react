import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

// You only check on the basis of authStatus so not compulsory to pass the prop authentication
export default function Protected({children, authentication=true}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);

    const authStatus = useSelector((state) => (state.auth.status))

    useEffect(() => {
        if(authentication && authStatus !== authentication) {
            navigate("/login")
        } else if(!authentication && authStatus !== authentication) {
            // authentication is false and authStatus is true
            navigate("/")
        }
        setLoader(false)
        
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>

}

