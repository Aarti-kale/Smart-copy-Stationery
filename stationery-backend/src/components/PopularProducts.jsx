import "./styles/PopularProducts.css";
import axios from "../utils/axios.js";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";

const PopularProducts = () => {
  const [popularProducts, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/products/popular")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="popular-section">
      <h2 className="section-title">Popular Products</h2>
      <div className="product-grid">
        {popularProducts.map((product) => (
          <div className="card" key={product.id}>
            <img
              src={
                `${BASE_URL}/public/uploads/${product.image}` || product.image
              }
              alt={product.name}
            />
            <h4>{product.name}</h4>
            <h5>{product.description}</h5>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
                        