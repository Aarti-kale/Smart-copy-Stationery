import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { BASE_URL } from "../config";

const Mission = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get("/mission") // adjust route
      .then((res) => setInfo(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="section-title">Our Mission</h2>
        <p className="text-muted">
          Empowering students, professionals, and businesses with high-quality
          stationery solutions.
        </p>
      </div>

      <div className="row g-4">
        {info.map((item, index) => (
          <div
            key={index}
            className="col-md-4"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="text-center p-4 border rounded shadow-sm h-100 bg-light transition hover-shadow hover-scale">
              <div className="mb-3">
                <img
                  src={`${BASE_URL}/public/uploads/${item.image}`}
                  alt={item.name}
                  className="img-fluid"
                  style={{ height: "80px", objectFit: "contain" }}
                />
              </div>
              <h5 className="fw-bold mb-2">{item.name}</h5>
              <p className="text-muted">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mission;
