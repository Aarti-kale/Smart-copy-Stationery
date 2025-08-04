// components/Values.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axios"; // your axios instance
import { BASE_URL } from "../config";

const Values = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get("/values")
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="section-title">Our Values</h2>
        <p className="text-muted">
          We are committed to principles that shape our services, support our
          community, and define our purpose.
        </p>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {values.map((val) => (
          <div className="col" key={val._id}>
            <div className="d-flex align-items-start bg-light rounded p-3 shadow-sm h-100 hover-shadow transition">
              <img
                src={`${BASE_URL}/public/uploads/${val.image}`}
                alt={val.name}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                className="me-3 rounded"
              />
              <div>
                <h5 className="mb-1 fw-semibold">{val.name}</h5>
                <p className="text-muted mb-0">{val.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;
