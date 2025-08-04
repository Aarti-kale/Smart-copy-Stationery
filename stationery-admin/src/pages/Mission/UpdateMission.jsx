import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const UpdateMission = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mission, setMission] = useState({
    name: "",
    image: null,
    content: "",
  });

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const res = await api.get(`/mission/${id}`);
        setMission({
          name: res.data.name || "",
          image: null, // Do not preload file input
          content: res.data.content || "",
        });
      } catch (error) {
        console.error("Failed to load mission data", error);
      }
    };
    fetchMission();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setMission((prev) => ({ ...prev, image: files[0] }));
    } else {
      setMission((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", mission.name);
      formData.append("content", mission.content);
      if (mission.image) {
        formData.append("image", mission.image);
      }

      await api.put(`/mission/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Mission updated successfully");
      navigate("/dashboard", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error updating mission", error);
      alert("Failed to update mission");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h4 style={styles.heading}>Update Mission</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={mission.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              className="form-control"
              rows="4"
              value={mission.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
            />
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

export default UpdateMission;

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
