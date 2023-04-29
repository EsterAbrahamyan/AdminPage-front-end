import React from 'react'
import { decodeToken } from "react-jwt";


export default function Profile() {
 const token= localStorage.getItem("token")
  const user = decodeToken(token)





  return (
    <div><h1>HELLO {user?.email}</h1></div>
  )
}