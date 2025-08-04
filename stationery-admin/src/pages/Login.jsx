import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/admin/login", { email, password });
      if (res.status === 200) {
        alert("Login successful!");
        localStorage.setItem("adminToken", res.data.token);
        navigate("/dashboard");
      } else {
        alert("Login failed. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <>
      {/* Fullscreen Container */}
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          background: "linear-gradient(to right, #1f1c2c, #928dab)",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        {/* Glass Card with Left-Right Split */}
        <div
          className="d-flex flex-column flex-md-row shadow-lg rounded-5 overflow-hidden w-100"
          style={{
            maxWidth: "960px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Left Section */}
          <div
            className="p-5 text-white d-flex flex-column justify-content-center"
            style={{
              background: "linear-gradient(135deg, #141e30, #243b55)",
              flex: 1,
              minWidth: "300px",
            }}
          >
            <h2 className="fw-bold mb-3">Welcome to Amol Stationery</h2>
            <p style={{ lineHeight: "1.7", fontSize: "15px" }}>
              Manage your inventory, track orders, and stay on top of your
              business — all from one admin panel.
              <br />
              <br />
              Need help? Contact us on
              <br />
              <strong>📱 WhatsApp: +91-9876543210</strong>
              <br />
              <strong>
                🌐{" "}
                <a href="#" className="text-white text-decoration-underline">
                  amolstationery.in
                </a>
              </strong>
            </p>
            <p className="mt-auto small text-white-50">
              &copy; 2025 Amol Stationery
            </p>
          </div>

          {/* Right Login Section */}
          <div
            className="p-5 bg-white"
            style={{
              flex: 1,
              minWidth: "300px",
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            <h4 className="text-center mb-4 fw-bold text-dark">Admin Login</h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control rounded-3"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold text-white"
                style={{
                  background: "linear-gradient(to right, #f12711, #f5af19)",
                  border: "none",
                  borderRadius: "30px",
                  padding: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              >
                🔒 Secure Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: "linear-gradient(to right, #485563, #29323c)",
          height: "60px",
          width: "100%",
          textAlign: "center",
          paddingTop: "18px",
          color: "#fff",
          fontWeight: "500",
          fontSize: "14px",
        }}
      >
        Powered by Amol Stationery | Secure Admin Portal
      </div>
    </>
  );
};

export default Login;
