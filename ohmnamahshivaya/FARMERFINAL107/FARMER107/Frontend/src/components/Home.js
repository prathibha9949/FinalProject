import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import farm1 from "../images/farm1.png";  // ✅ Correct path


const Home = () => {
  return (
    <div className="container text-center my-5">
      {/* Big Banner Image */}
      
      <img
  src={farm1}  // ✅ Use curly braces to reference the imported image
  alt="Banner"
  className="img-fluid w-100"
  style={{ width: "100%",  height: "150%" , objectFit: "cover" }}
/>

      {/* Text below the image */}
      <div className="mt-4">
        <h1 className="fw-bold text-success">Welcome to Our Agriculture Platform</h1>
        <p className="text-muted">
          Connect, rent equipment, and innovate. Discover how we empower farmers and businesses.
        </p>
      </div>
    </div>
  );
};

export default Home;
