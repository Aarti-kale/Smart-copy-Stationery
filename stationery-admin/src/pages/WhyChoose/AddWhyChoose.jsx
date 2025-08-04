import React, { useState } from "react";
import api from "../../utils/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTestimonial = () => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    icon: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setFormData({ ...formData, icon: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("desc", formData.desc);
    data.append("image", formData.icon); // match backend multer

    try {
      const res = await api.post("/why-choose", data);
      toast.success("Why Choose us added successfully!");
      setFormData({ title: "", desc: "", icon: null });
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Testimonial</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="desc"
            className="form-control"
            value={formData.desc}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            name="icon"
            type="file"
            className="form-control"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default AddTestimonial;
