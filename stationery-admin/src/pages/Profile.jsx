import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Card, Spinner, Alert, Row, Col, Image, InputGroup, FormControl, Button } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons"; // install if not available

const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4 text-center">
        {error}
      </Alert>
    );
  }

  return (
    <div className="container mt-5">
      <Card className="shadow p-4 border-0">
        <Row className="align-items-center">
          <Col md={3} className="text-center mb-3 mb-md-0">
            <Image
              src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff&size=128"
              roundedCircle
              fluid
              alt="Admin Avatar"
            />
          </Col>
          <Col md={9}>
            <h3 className="mb-3">Admin Profile</h3>
            <hr />
            <p><strong>Name:</strong> {admin.name || "N/A"}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Role:</strong> {admin.role || "Admin"}</p>
            <p><strong>Mobile:</strong> {admin.mobile || "Not Provided"}</p>
            <p><strong>Joined On:</strong> {new Date(admin.createdAt).toLocaleDateString()}</p>
            
            <div className="mt-3">
              <strong>Password:</strong>
              <InputGroup className="mt-1">
                <FormControl
                  type={showPassword ? "text" : "password"}
                  value={admin.password || "********"}
                  readOnly
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeSlashFill /> : <EyeFill />}
                </Button>
              </InputGroup>

              <div className="mt-2">
    <Button
      variant="link"
      className="p-0"
      onClick={() => window.location.href = "/forgot-password"}
    >
      Forgot Password?
    </Button>
    </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Profile;
