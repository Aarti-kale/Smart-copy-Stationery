import React, { useEffect, useState } from "react";
import "./styles/Testimonials.css";
import axios from "../utils/axios.js";
import { BASE_URL } from "../config";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    axios
      .get("/testimonials")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  return (
    <section className="py-5 bg-light testimonials-section">
      <div className="container text-center">
        <h2 className="fw-bold mb-5 heading-style">What Our Customers Say</h2>
        <div className="row g-4 justify-content-center">
          {testimonials.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="testimonial-card p-4 rounded shadow-sm h-100 bg-white position-relative">
                <div className="testimonial-img-wrapper mx-auto mb-3">
                  <img
                    src={
                      `${BASE_URL}/public/uploads/${item.image}` || item.image
                    }
                    alt={item.name}
                    className="rounded-circle border border-3 border-white testimonial-img"
                  />
                </div>
                <p className="text-muted fst-italic">"{item.feedback}"</p>
                <h6 className="fw-bold mt-3 mb-0">{item.name}</h6>
                <small className="text-secondary">{item.role}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
