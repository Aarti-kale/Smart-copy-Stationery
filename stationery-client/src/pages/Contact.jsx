import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import axios from "../utils/axios.js";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactInfo, setContactInfo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/contact", formData);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  //  contact-info
  useEffect(() => {
    axios
      .get("/contact-info")
      .then((res) => {
        setContactInfo(res.data);
      })
      .catch((err) => {
        console.error("Error fetching contact info:", err);
      });
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #e6f2ff, #ffffff)",
        padding: "60px 0",
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <Container>
        {/* Title */}
        <h2
          className="text-center fw-bold mb-5 mt-5"
          style={{
            color: "#004E89",
            position: "relative",
            display: "inline-block",
          }}
        >
          Contact Us
          <span
            style={{
              display: "block",
              width: "60%",
              height: "4px",
              backgroundColor: "#004E89",
              position: "absolute",
              left: "20%",
              bottom: "-10px",
              borderRadius: "2px",
            }}
          ></span>
        </h2>

        <Row className="align-items-start g-4">
          {/* Form */}
          <Col md={6}>
            <div className="p-4 border rounded shadow-sm bg-white">
              <Form method="post" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "#004E89", border: "none" }}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Col>

          {/* Info & Map */}
          <Col md={6}>
            <div className="p-4 border rounded shadow-sm bg-white">
              {contactInfo ? (
                <>
                  <div className="mb-4">
                    {/* <h5><FaPhoneAlt className="me-2 text-primary" />Phone:</h5>
                <p>{contactInfo.phone}</p> */}
                    <FaPhoneAlt className="me-2 text-primary" />
                    <strong className="me-2">Phone:</strong>
                    <span>{contactInfo.phone}</span>
                  </div>

                  <div className="mb-4">
                    {/* <h5><FaEnvelope className="me-2 text-primary" />Email:</h5>
                <p>{contactInfo.email}</p> */}
                    <FaEnvelope className="me-2 text-primary" />
                    <strong className="me-2">Email:</strong>
                    <span>{contactInfo.email}</span>
                  </div>

                  <div className="mb-4">
                    <strong>
                      <FaMapMarkerAlt className="me-2 text-primary" />
                      Address:
                    </strong>
                    <p>{contactInfo.address}</p>
                  </div>

                  <div className="ratio ratio-16x9">
                    <iframe
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        contactInfo.address
                      )}&output=embed`}
                      title="Location"
                      allowFullScreen
                      loading="lazy"
                      style={{ borderRadius: "10px" }}
                    ></iframe>
                  </div>
                </>
              ) : (
                <p>Loading contact information.....</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
