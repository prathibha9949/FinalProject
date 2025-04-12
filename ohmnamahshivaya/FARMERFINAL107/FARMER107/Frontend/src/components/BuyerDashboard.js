// frontend/src/components/BuyerDashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import ProductDetails from "./ProductDetails";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User may not be authenticated.");
          navigate("/login"); // Redirect to login if not authenticated
          return;
        }
        const response = await axios.get("https://finalproject-2-mdww.onrender.com/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          console.error("Failed to fetch products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [navigate]);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.equipmentName} has been added to your cart!`);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Available Equipment for Rent</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary btn-sm" onClick={() => navigate("/cart")}>
          View Cart
        </button>
      </div>

      {/* Scrollable container */}
      <div className="product-list">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <div className="col" key={product._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:5004${product.photo}`}
                  className="card-img-top"
                  alt={product.equipmentName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <hr style={{ border: "2px solid black", margin: "0" }} />
                <div className="card-body">
                  <h5 className="card-title">{product.equipmentName}</h5>
                  <p className="card-text">Rent: ₹{product.rent}</p>
                  <p className="card-text">Location: {product.place}</p>
                  <p className="card-text">Contact: {product.mobile}</p>
                </div>
                <div className="card-footer d-flex justify-content-around">
                  <button className="btn btn-warning btn-sm" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                  <button className="btn btn-info btn-sm" onClick={() => handleViewDetails(product)}>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && <ProductDetails product={selectedProduct} onClose={handleCloseDetails} />}
    </div>
  );
};

export default BuyerDashboard;
