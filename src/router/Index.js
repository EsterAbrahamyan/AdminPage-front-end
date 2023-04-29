import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/Login.js";
import Register from "../Components/Register.js";
import Profile from "../Components/Profile.js";
import AdminPage from "../Components/AdminPanel/AdminPage.js";
import CreateProduct from "../Components/AdminPanel/AddProduct.js";
import AddCategory from "../Components/AdminPanel/Addcategory.js";
import UpdateProduct from "../Components/AdminPanel/UpdateProduct.js";
import Products from "../Components/AdminPanel/Product.js";
import Categories from "../Components/AdminPanel/Categories.js";
import ProtectedRoute from "./privat.js";
import Header from "../Components/Header.js";



function Router() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Header />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="adminpage" element={<ProtectedRoute><AdminPage /></ProtectedRoute>}>
              <Route path="products/createProduct" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>}/>
              <Route path="addCategory" element={<ProtectedRoute><AddCategory /></ProtectedRoute>}/>
              <Route path="products/updateproduct/:id" element={<ProtectedRoute><UpdateProduct /></ProtectedRoute>}/>
              <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>}/>
              <Route path="categories" element={<ProtectedRoute><Categories /></ProtectedRoute>}/>
              
              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;