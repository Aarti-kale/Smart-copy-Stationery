import React, { useEffect, useState } from "react";
import axios from "../../utils/axios.js"; // Adjust path based on your project structure

export default function AllMessages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("/contact") // Replace with your actual backend endpoint
      .then((res) => setMessages(res.data))
      .catch((err) => {
        console.error("Error fetching messages:", err);
        setError("❌ Failed to load contact messages.");
      });
  }, []);

  // Pagination
  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const paginatedMessages = messages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h4 style={styles.heading}>All Contact Messages</h4>

        {error && <div style={styles.error}>{error}</div>}

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-light text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {paginatedMessages.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-muted">
                    No messages found
                  </td>
                </tr>
              ) : (
                paginatedMessages.map((msg, i) => (
                  <tr key={msg._id}>
                    <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.message}</td>
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
