import { Navigate, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useEffect } from "react";



const ProtectedRoute = (props) => {
 const navigate = useNavigate();
 const user = localStorage.getItem("token")
 const decodedToken = decodeToken(user);
 const checkUserToken = () => {
     if (!user || user === 'undefined' || decodedToken.role === 0) {
         return navigate('/login');
     }
 }
 useEffect(() => {
         checkUserToken();
     }, [decodeToken]);
 return (
     <>
         {
             decodeToken ? props.children : null
         }
     </>
 );
}
export default ProtectedRoute;