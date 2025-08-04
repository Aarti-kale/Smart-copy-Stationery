import React, { useEffect, useState } from "react";
import "./styles/WhyChooseUs.css";
import axios from "../utils/axios.js";
import { BASE_URL } from "../config";

const WhyChooseUs = () => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios
      .get("/why-choose")
      .then((res) => setFeatures(res.data))
      .catch((err) => console.error("error fetching features:", err));
  }, []);

  return (
    <section className="why-section-custom py-5">
      <div className="container text-center">
        <h2 className="section-title mb-5">Why Choose Us?</h2>
        <div className="row justify-content-center g-4">
          {features.map((feature, i) => (
            <div key={i} className="col-md-4 col-sm-6">
              <div className="feature-card animate-fade-in h-100 p-4">
                <img
                  src={
                    `${BASE_URL}/public/uploads/${feature.image}` ||
                    feature.image
                  }
                  alt={feature.title}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                />

                <h5 className="feature-title mb-2">{feature.title}</h5>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
