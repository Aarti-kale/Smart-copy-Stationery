import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";
import axios from "../utils/axios.js";
import { BASE_URL } from "../config";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ new state

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        setProducts(res.data.products || res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleWhatsAppOrder = (product) => {
    const message = `Hello, I want to order:

🛒 *${product.name}*
🖼️ *Image:* ${product.image}
💰 *Price:* ₹${product.price}
📄 *Details:* ${product.description}

Please pack this order for me.
Customer information
👤 *Customer Name:* ____________
📞 *Mobile:* ____________
🏠 *Address:* ____________`;

    const phoneNumber = "5689346790";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  // ✅ filter logic
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5 px-3 bg-custom">
      <h2
        className="text-center fw-bold mb-4 mt-5 text-custom"
        style={{ color: "#004E89" }}
      >
        Our Products
      </h2>

      {/* ✅ search input */}

      <div className="mb-4 d-flex justify-content-center">
        <div
          className="input-group w-75 shadow-sm"
          style={{
            maxWidth: "500px",
            borderRadius: "50px",
            overflow: "hidden",
            backgroundColor: "#ffffff",
          }}
        >
          <span
            className="input-group-text bg-white border-0"
            style={{ paddingLeft: "20px" }}
          >
            🔍
          </span>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Search by first letter (e.g. a, b, m...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: "0 50px 50px 0",
              padding: "12px 20px",
              fontSize: "16px",
              backgroundColor: "#f9f9f9",
            }}
          />
        </div>
      </div>

      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-6 col-sm-6 col-md-4 col-lg-3">
              <div className="card product-card h-100">
                <img
                  src={`${BASE_URL}/public/uploads/${product.image}`}
                  alt={product.name}
                  className="card-img-top product-image"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-primary">
                    {product.name}
                  </h5>
                  <p className="card-text small">{product.description}</p>
                  <h5 className="card-title text-success">₹{product.price}</h5>
                  <button
                    className="btn mt-auto"
                    style={{
                      backgroundColor: "#004E89",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "20px",
                      transition: "0.3s",
                    }}
                    onClick={() => handleWhatsAppOrder(product)}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#023b66")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#004E89")
                    }
                  >
                    Order on WhatsApp 📱
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
