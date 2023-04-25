import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../Components/Register";
import Login from "../Components/Login";
import Addcategory from "../Components/AdminPanel/Addcategory";
import Header from "../Components/Header";



import ProtectedRoute from "./privat.js";
import AdminPage from "../Components/AdminPanel/AdminPage";
import Products from "../Components/Products";
import Profile from "../Components/Profile";




function Router() {
    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Header />}>
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="login" element={<Login />} />
                    <Route path="addCategory" element={<ProtectedRoute><Addcategory /></ProtectedRoute>}/>
                    <Route path="adminPage" element={<ProtectedRoute><AdminPage /></ProtectedRoute>}>
                    <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>}/>
                </Route>
                </Route>
             </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;