import React, { useEffect, useState } from "react";
import api from "../../utils/axios.js";
import { BASE_URL } from "../../config.js";
export default function ShopInfo() {
  const [formData, setFormData] = useState({
    content: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [id, setId] = useState(null);

  // Load existing shop info
  useEffect(() => {
    api
      .get("/shop")
      .then((res) => {
        const data = res.data;
        setFormData({
          content: data.content || "",
          image: null, // don't preload file input
        });
        setPreviewUrl(data.image); // assuming image path like /uploads/xyz.jpg
        setId(data._id);
      })
      .catch((err) => console.error("❌ Failed to load shop info:", err));
  }, []);

  // Handle text change
  const handleChange = (e) => {
    setFormData({ ...formData, content: e.target.value });
  };

  // Handle image file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // preview new image
    }
  };

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      alert("❌ Cannot update without ID");
      return;
    }

    const data = new FormData();
    data.append("content", formData.content);
    if (formData.image) data.append("image", formData.image);

    api
      .put(`/shop/${id}`, data)
      .then(() => alert("✅ Shop Info updated!"))
      .catch((err) => alert("❌ Update failed: " + err.message));
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h4 style={styles.heading}>Update Shop Info</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Shop Description</label>
            <textarea
              className="form-control"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {previewUrl && (
            <div className="mb-3 text-center">
              <img
                src={
                  previewUrl.startsWith("blob:")
                    ? previewUrl
                    : `${BASE_URL}/public/uploads/${previewUrl}` // Direct full path
                }
                alt="Shop Preview"
                style={{
                  maxHeight: "200px",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              />
            </div>
          )}

          <div className="text-center mt-4">
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
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    marginBottom: "20px",
    fontWeight: "600",
    color: "#2c2f48",
    textAlign: "center",
  },
};
