import React from "react";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "../utils/axios.js";
import { BASE_URL } from "../config";

const ShopInfo = () => {
  const [shop, setShop] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    axios
      .get("/shop")
      .then((res) => setShop(res.data))
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-page container py-5">
      {/* Shop Info */}
      <section className="mb-5 px-3 px-md-5 shop-info-section">
        <h2 className="section-title mt-5">Welcome To Amol Stationery</h2>

        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={`${BASE_URL}/public/uploads/${shop.image}` || shop.image}
              alt="Amol Stationery Shop"
              className="img-fluid rounded shadow hover-scale"
              style={{ Height: "500px", width: "89%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <p className="lead text-secondary">{shop.content}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopInfo;
