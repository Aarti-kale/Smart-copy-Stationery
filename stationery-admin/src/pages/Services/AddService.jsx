import React, { useState } from "react";
import axios from "../../utils/axios"; // Adjust the path if needed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddService() {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
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
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await axios.post("/services", data);
      toast.success("✅ Service added successfully!");

      // Reset form
      setFormData({
        title: "",
        image: null,
        description: "",
      });

      console.log("Service added:", res.data);
    } catch (err) {
      console.error("Error adding service:", err);
      toast.error("❌ Failed to add service.");
    }
  };

  return (
    <div style={styles.page}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div style={styles.card}>
        <h4 style={styles.heading}>Add Service</h4>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Service Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
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
