import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroBanner = () => {
  return (
    <div
      className="hero-banner d-flex align-items-center justify-content-center text-white text-center"
      style={{
        backgroundImage: `url('https://www.shutterstock.com/image-photo/copier-printer-close-hand-office-260nw-2102621596.jpg?auto=format&fit=crop&w=1350&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(0, 78, 137, 0.6))",
          zIndex: 1,
        }}
      ></div>

      {/* Text content */}
      <div style={{ zIndex: 2, padding: "20px", maxWidth: "700px" }}>
        <h1 className="display-4 fw-bold mb-3">
          Welcome to <br /> Amol Smart Copy & Stationery
        </h1>
        <p className="lead mb-4">
          Quality Printing, Xerox, Stationery, and Fast Service – All in One
          Place!
        </p>

        <a
          href="/whatsapp-order"
          className="btn btn-success px-4 py-2 fw-bold"
          style={{
            backgroundColor: "#25D366",
            border: "none",
            fontSize: "1.1rem",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1EBE5D")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#25D366")}
        >
          📲 Order on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;
