import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Services.css";
import {
  FaWhatsapp,
  FaClipboardList,
  FaStore,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import "./Services.css";

const WhatsAppOrder = () => {
  const phoneNumber = "3456789045";
  const message = "Hi, I’d like to place an order for pickup.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 100 * i);
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#f0f8ff" }}>
      <Container className="py-5">
        {/* Hero */}
        <div className="text-center fade-up">
          <h1 className="fw-bold mb-3 mt-5" style={{ color: "#004E89" }}>
            Order via WhatsApp
          </h1>
          <p className="text-muted mb-4">
            Place your order online & pick it up in-store with zero hassle.
          </p>
          <Button
            href={whatsappLink}
            target="_blank"
            className="px-4 py-2"
            style={{
              backgroundColor: "#004E89",
              border: "none",
              fontWeight: "bold",
            }}
          >
            <FaWhatsapp className="me-2" /> Order Now
          </Button>
        </div>

        {/* Steps */}
        <section className="my-5 fade-up">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#004E89" }}>
            How It Works
          </h2>
          <Row className="g-4 text-center">
            <Col md={4}>
              <div className="p-4 bg-white shadow-sm rounded-4 h-100">
                <FaClipboardList size={40} color="#004E89" className="mb-3" />
                <h5>Step 1: Send Order</h5>
                <p className="text-muted">
                  Message us what you need via WhatsApp.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 bg-white shadow-sm rounded-4 h-100">
                <FaStore size={40} color="#004E89" className="mb-3" />
                <h5>Step 2: We Prepare</h5>
                <p className="text-muted">We’ll pack your order on time.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 bg-white shadow-sm rounded-4 h-100">
                <FaMapMarkerAlt size={40} color="#004E89" className="mb-3" />
                <h5>Step 3: Pickup</h5>
                <p className="text-muted">Come to the store, no waiting.</p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Pickup Info */}
        <section className="fade-up">
          <h2 className="text-center fw-bold mb-4" style={{ color: "#004E89" }}>
            Pickup Details
          </h2>
          <Row className="g-4 justify-content-center">
            <Col md={5}>
              <div className="p-4 bg-white shadow-sm rounded-4 h-100 text-center">
                <FaMapMarkerAlt size={30} color="#004E89" className="mb-2" />
                <h5>Pickup Location</h5>
                <p className="text-muted">
                  Smart Copy & Stationery
                  <br />
                  Ramdoh, Tal: Rahata, Dist: Ahmednagar
                </p>
              </div>
            </Col>
            <Col md={5}>
              <div className="p-4 bg-white shadow-sm rounded-4 h-100 text-center">
                <FaPhoneAlt size={30} color="#004E89" className="mb-2" />
                <h5>Contact Info</h5>
                <p className="text-muted">
                  Phone: +91 99999 99999
                  <br />
                  WhatsApp Orders: 9 AM – 8 PM (Mon–Sat)
                </p>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default WhatsAppOrder;
