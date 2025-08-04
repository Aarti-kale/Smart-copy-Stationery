import React, { useEffect, useState } from "react";
import axios from "../../utils/axios.js";
import { BASE_URL } from "../../config";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllTeam() {
  const [team, setTeam] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = () => {
    axios
      .get("/team")
      .then((res) => setTeam(res.data))
      .catch((err) => {
        console.error("Error fetching team:", err);
        setError("❌ Failed to load team members.");
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await axios.delete(`/team/${id}`);
        fetchTeam();
        toast.success("✅ Team member deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete team member.");
        toast.error("Error deleting Team member");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/team/${id}`);
  };

  // Pagination logic
  const totalPages = Math.ceil(team.length / itemsPerPage);
  const paginatedTeam = team.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div style={styles.page}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div style={styles.card}>
        <h4 style={styles.heading}>All Team Members</h4>

        {error && <div style={styles.error}>{error}</div>}

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-light text-center">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {paginatedTeam.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-muted">
                    No team members found
                  </td>
                </tr>
              ) : (
                paginatedTeam.map((member, i) => (
                  <tr key={member._id}>
                    <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                    <td>
                      <img
                        src={
                          member.image
                            ? `${BASE_URL}/public/uploads/${member.image}`
                            : "/images/default.jpg"
                        }
                        alt={member.name}
                        width="60"
                        height="60"
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                      />
                    </td>
                    <td>{member.name}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleUpdate(member._id)}
                      >
                        ✏ Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(member._id)}
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
