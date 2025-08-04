import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axios";

const UpdateTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teamMember, setTeamMember] = useState({
    name: "",
    image: null,
  });

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const res = await api.get(`/team/${id}`);
        setTeamMember({
          name: res.data.name,
          image: null, // Do not prefill file input
        });
      } catch (error) {
        console.error("Failed to load team member", error);
      }
    };
    fetchTeamMember();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setTeamMember((prev) => ({ ...prev, image: files[0] }));
    } else {
      setTeamMember((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", teamMember.name);
      if (teamMember.image) {
        formData.append("image", teamMember.image);
      }

      await api.put(`/team/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Team member updated successfully");
      navigate("/dashboard", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error updating team member", error);
      alert("Failed to update team member");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h4 style={styles.heading}>Update Team Member</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={teamMember.name}
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

export default UpdateTeam;

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
