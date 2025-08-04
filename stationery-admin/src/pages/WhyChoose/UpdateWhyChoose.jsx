import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const UpdateWhyChoose = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [whyChoose, setWhyChoose] = useState({
    title: "",
    desc: "",
    image: null,
  });

  useEffect(() => {
    const fetchWhyChoose = async () => {
      try {
        const res = await api.get(`/why-choose/${id}`);
        setWhyChoose({
          title: res.data.title,
          desc: res.data.desc,
          image: null, // do not prefill file input
        });
      } catch (error) {
        console.error("Failed to load item", error);
      }
    };
    fetchWhyChoose();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setWhyChoose((prev) => ({ ...prev, image: files[0] }));
    } else {
      setWhyChoose((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", whyChoose.title);
      formData.append("desc", whyChoose.desc);
      if (whyChoose.image) {
        formData.append("image", whyChoose.image);
      }

      await api.put(`/why-choose/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Item updated successfully");
      navigate("/dashboard", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error updating item", error);
      alert("Failed to update item");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h4 style={styles.heading}>Update Why Choose Us</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={whyChoose.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">image</label>
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
              name="desc"
              className="form-control"
              rows="3"
              value={whyChoose.desc}
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

export default UpdateWhyChoose;

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
