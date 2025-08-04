import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top px-4"
      style={{ backgroundColor: "#004E89" }}
    >
      <NavLink className="navbar-brand text-white fw-bold" to="/">
        Amol Smart Copy & Stationery
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white fw-bold" end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link text-white fw-bold">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products" className="nav-link text-white fw-bold">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/services" className="nav-link text-white fw-bold">
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/whatsapp-order"
              className="nav-link text-white fw-bold"
            >
              WhatsApp Order
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link text-white fw-bold">
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
