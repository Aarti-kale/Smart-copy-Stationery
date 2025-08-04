import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const UpdateService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setService({
          title: res.data.title,
          description: res.data.description,
          image: null, // don't prefill file input
        });
      } catch (error) {
        console.error("Failed to load service", error);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setService((prev) => ({ ...prev, image: files[0] }));
    } else {
      setService((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", service.title);
      formData.append("description", service.description);
      if (service.image) {
        formData.append("image", service.image);
      }

      await api.put(`/services/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Service updated successfully");
      navigate("/dashboard", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error updating service", error);
      alert("Failed to update service");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h4 style={styles.heading}>Update Service</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Service Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={service.title}
                onChange={handleChange}
                required
              />
            </div>
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
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={service.description}
              onChange={handleChange}
              required
            ></textarea>
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

export default UpdateService;

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
