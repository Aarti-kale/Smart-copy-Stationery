import React, { useEffect, useState } from "react";
import axios from "../utils/axios"; // your custom Axios instance with token
import { Card, Spinner, Alert } from "react-bootstrap";

const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/admin/login/profile");
        setAdmin(res.data.admin);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card className="p-4 shadow mt-4">
      <h3>Admin Profile</h3>
      <hr />
      <p><strong>Email:</strong> {admin.email}</p>
      
    </Card>
  );
};

export default Profile;
