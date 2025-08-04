import React, { useEffect, useState } from "react";
import axios from "../utils/axios.js";
import { BASE_URL } from "../config";

import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".fade-up");
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add("visible");
      }, 150 * i);
    });
  }, [services]);

  return (
    <div className="container py-5 px-3" style={{ backgroundColor: "#f0f8ff" }}>
      <h2 className="text-center fw-bold mb-5 mt-5" style={{ color: "#004E89" }}>
         Our Services
      </h2>

      <div className="row justify-content-center gx-4 gy-4">
        {services.map((service, index) => (
          <div className="col-12 col-sm-8 col-md-6 col-lg-4 d-flex justify-content-center" key={index}>
            <div className="card h-100 shadow fade-up border-0 rounded-4 text-center w-100">
              <div className="card-body d-flex flex-column align-items-center p-3">
                <img
                  src={`${BASE_URL}/public/uploads/${service.image}`}
                  alt={service.title}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />
                <h6 className="fw-bold mb-2" style={{ color: "#004E89" }}>
                  {service.title}
                </h6>
                <p className="text-muted small">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-5 pt-5 border-top text-center">
        <h3 className="fw-bold mb-3" style={{ color: "#004E89" }}>
          💡 Why Choose Smart Copy?
        </h3>
        <p className="lead px-2">
          We combine speed, quality, and affordability with personalized service.
        </p>

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <ul className="list-group list-group-flush text-start text-md-center mb-4 px-2 px-md-4">
              {[
                "✅ Instant Services Available",
                "✅ Reliable and Friendly Support",
                "✅ Best Rates in the Market",
                "✅ WhatsApp Orders & Quick Pickup",
              ].map((item, i) => (
                <li
                  className="list-group-item bg-transparent border-0 small"
                  key={i}
                >
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/whatsapp-order"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-primary px-4"
              style={{ backgroundColor: "#004E89", border: "none" }}
            >
              📲 Chat with Us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
