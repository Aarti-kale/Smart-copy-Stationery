import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    image: null,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get(`/categories/${id}`);
        setCategory({
          name: res.data.name,
          image: null, // don't preload image file
        });
      } catch (error) {
        console.error("Failed to load category", error);
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCategory((prev) => ({ ...prev, image: files[0] }));
    } else {
      setCategory((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", category.name);
      if (category.image) {
        formData.append("image", category.image);
      }

      await api.put(`/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Category updated successfully");
      navigate("/dashboard", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error updating category", error);
      alert("Failed to update category");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h4 style={styles.heading}>Update Category</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={category.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category Image</label>
              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
              />
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

export default UpdateCategory;

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
