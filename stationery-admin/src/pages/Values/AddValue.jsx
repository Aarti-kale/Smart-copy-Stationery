import React, { useState } from "react";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddValue() {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("content", formData.content);
    if (formData.image) data.append("image", formData.image);

    try {
      const res = await axios.post("/values", data);
      toast.success("✅ Value added successfully!");

      // Reset form
      setFormData({
        name: "",
        content: "",
        image: null,
      });

      console.log("Value added:", res.data);
    } catch (err) {
      console.error("Error adding value:", err);
      toast.error("❌ Failed to add value.");
    }
  };

  return (
    <div style={styles.page}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div style={styles.card}>
        <h4 style={styles.heading}>Add Value</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">content</label>
            <textarea
              className="form-control"
              name="content"
              rows="4"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="text-center mt-3">
            <button
              type="submit"
              className="btn px-4"
              style={{ backgroundColor: "#3b3e5a", color: "white" }}
            >
              Submit
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
  },
  heading: {
    marginBottom: "20px",
    fontWeight: "600",
    color: "#2c2f48",
    textAlign: "center",
  },
};
