// frontend/src/App.js

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import About from "./components/About";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import ProductsPage from "./components/ProductsPage";
import Cart from "./components/Cart";
import BuyerDashboard from "./components/BuyerDashboard";
import UpdateProduct from "./components/UpdateProduct";
//import MainComponent from './components/MainComponent';
//import RightSidebar from './components/RightSidebar'; // Import RightSidebar component
import LaborersList from "./components/LaborersList";
import { CartProvider } from "./context/CartContext";
import NeedWork from "./components/NeedWork";
import PrivateRoute from "./components/PrivateRoute"; // 👈 import it at the top
//import UserProfile from './components/UserProfile'; 
function App() {
    const [user, setUser] = useState(null); // State for user data
    const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

    const handleLogin = (userData) => {
        setUser(userData); // Set user data on login
    };

    const handleLogout = () => {
        setUser(null); // Clear user data on logout
        localStorage.removeItem('token'); // Optionally remove token from local storage
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
    };

    return (
        <CartProvider>
            <div className="App d-flex">
                <BrowserRouter>
                    <Navbar />
                    <div className="flex-grow-1">
                        <div className="container mt-5">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
                                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
                                <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                                <Route path="/buyer-dashboard" element={<PrivateRoute><BuyerDashboard /></PrivateRoute>} />
                                <Route path="/update-product/:id" element={<PrivateRoute><UpdateProduct /></PrivateRoute>} />
                                <Route path="/need-work" element={<PrivateRoute><NeedWork /></PrivateRoute>} />
                                <Route path="/laborers-list" element={<PrivateRoute><LaborersList /></PrivateRoute>} />

                            </Routes>
                        </div>
                    </div>
                    {/* Right Sidebar for user profile */}
                    
                </BrowserRouter>
            </div>
        </CartProvider>
    );
}

export default App;
