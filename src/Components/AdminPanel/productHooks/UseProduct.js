import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {decodeToken} from "react-jwt"

export default function useProduct() {

  const [products, setProducts] = useState([]);
  const [isDel, setIsdel] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:5001/prod")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setProducts(res);
      });
  }, [isDel]);

    const deleteProduct = async (id) => {
      console.log(id);
        const token = localStorage.getItem('token');
        const decodedToken = decodeToken(token);
          console.log(decodedToken);
          try {
            const response = await fetch(
              `http://localhost:5001/prod/delete`,
              {
                method: "DELETE",
                body: JSON.stringify({
                  id,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  Authorization:`Bearer ${token}`
                },
              }
            );
            if(response.status === 401 || response.status === 403){
              console.log(response.status);
              navigate('/');
            }

            const data = await response.json();
            console.log(data);
            setIsdel(!isDel);
          } catch (err) {
            console.log(err);
          }
    };

    
    
       
  return {deleteProduct,products}
  
}