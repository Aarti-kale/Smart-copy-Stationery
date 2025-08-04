import React, { useEffect, useState } from "react";
import api from "../../utils/axios.js";

export default function AddressDetails() {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    address: "",
  });
  const [id, setId] = useState(null); // store ID for update

  // Load existing address details
  useEffect(() => {
    api
      .get("/contact-info")
      .then((res) => {
        const data = res.data;
        setFormData({
          phone: data.phone || "",
          email: data.email || "",
          address: data.address || "",
        });
        setId(data._id); // assuming MongoDB or your DB returns _id
      })
      .catch((err) => console.error("❌ Failed to load address info:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      alert("❌ Cannot update without ID");
      return;
    }
    api
      .put(`/contact-info/${id}`, formData)
      .then(() => alert("✅ Address updated successfully!"))
      .catch((err) => alert("❌ Update failed: " + err.message));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h4 style={styles.heading}>Update Address Details</h4>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Your Address</label>
            <textarea
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Paste Google Maps embed address link here..."
              required
            />
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn px-4"
              style={{ backgroundColor: "#3b3e5a", color: "white" }}
            >
              Update
            </button>
          </div>
        </form>
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
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    marginBottom: "20px",
    fontWeight: "600",
    color: "#2c2f48",
    textAlign: "center",
  },
};
