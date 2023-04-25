import React from 'react'
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate=useNavigate()
  const token= localStorage.getItem("token")
  const user = decodeToken(token)
  
 if(!token ){
  navigate("/")
 }




  return (
    <div><h1>HELLO {user?.email}</h1></div>
  )
}