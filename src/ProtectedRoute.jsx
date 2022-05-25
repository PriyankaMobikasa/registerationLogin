import React,{useState} from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    if(!localStorage.getItem("Token"))
    {
        return <Navigate to='/login'/>
    }
    else{
        return children
    }
}

export default ProtectedRoute