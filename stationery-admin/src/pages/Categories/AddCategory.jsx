import React, { useState } from "react";
import axios from "../../utils/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCategory() {
  const [formData, setFormData] = useState({
    name: "",
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

    const categoryData = new FormData();
    categoryData.append("name", formData.name);
    if (formData.image) categoryData.append("image", formData.image);

    try {
      const res = await axios.post("/categories", categoryData);
      toast.success("✅ Category added successfully!");
      console.log("Success:", res.data);

      setFormData({
        name: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("❌ Failed to add category.");
    }
  };

  return (
    <div style={styles.page}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div style={styles.card}>
        <h4 style={styles.heading}>Add Category</h4>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
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
