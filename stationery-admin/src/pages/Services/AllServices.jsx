import React, { useEffect, useState } from "react";
import axios from "../../utils/axios.js";
import { BASE_URL } from "../../config";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios
      .get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => {
        console.error("Error fetching services:", err);
        setError("❌ Failed to load services.");
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`/services/${id}`);
        toast.success("✅ Service deleted successfully!");
        fetchServices();
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("❌ Failed to delete service.");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/services/update-service/${id}`);
  };

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const paginatedServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div style={styles.page}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={styles.card}>
        <h4 style={styles.heading}>All Services</h4>

        {error && <div style={styles.error}>{error}</div>}

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-light text-center">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {paginatedServices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-muted">
                    No services found
                  </td>
                </tr>
              ) : (
                paginatedServices.map((s, i) => (
                  <tr key={s._id}>
                    <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                    <td>
                      <img
                        src={
                          s.image
                            ? `${BASE_URL}/public/uploads/${s.image}`
                            : "/images/default.jpg"
                        }
                        alt={s.title}
                        width="60"
                        height="60"
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                    </td>
                    <td>{s.title}</td>
                    <td>{s.description}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleUpdate(s._id)}
                      >
                        ✏ Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(s._id)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === 1}
              onClick={handlePrev}
            >
              ◀ Previous
            </button>
            <span className="fw-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === totalPages}
              onClick={handleNext}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f2f4f8",
    minHeight: "100vh",
    padding: "30px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },
  heading: {
    marginBottom: "20px",
    fontWeight: "600",
    color: "#2c2f48",
    textAlign: "center",
  },
  error: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    fontSize: "14px",
  },
};
