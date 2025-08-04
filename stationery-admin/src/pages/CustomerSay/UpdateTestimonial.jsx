import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const UpdateTestimonial = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [testimonial, setTestimonial] = useState({
    name: "",
    role: "",
    feedback: "",
    image: null,
  });

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await api.get(`/testimonials/${id}`);
        setTestimonial({
          name: res.data.name,
          role: res.data.role,
          feedback: res.data.feedback,
          image: null, // don't prefill image
        });
      } catch (error) {
        console.error("Failed to load testimonial", error);
      }
    };
    fetchTestimonial();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setTestimonial((prev) => ({ ...prev, image: files[0] }));
    } else {
      setTestimonial((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", testimonial.name);
      formData.append("role", testimonial.role);
      formData.append("feedback", testimonial.feedback);
      if (testimonial.image) {
        formData.append("image", testimonial.image);
      }

      await api.put(`/testimonials/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Testimonial updated successfully");
      navigate("/dashboard", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error updating testimonial", error);
      alert("Failed to update testimonial");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h4 style={styles.heading}>Update Testimonial</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={testimonial.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <input
                type="text"
                name="role"
                className="form-control"
                value={testimonial.role}
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
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Feedback</label>
              <textarea
                name="feedback"
                className="form-control"
                rows="3"
                value={testimonial.feedback}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          <div className="text-center">
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
};

export default UpdateTestimonial;

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
