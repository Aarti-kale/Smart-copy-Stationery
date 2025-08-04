import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-light mt-5 " style={{ backgroundColor: "#004E89" }}>
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand Info */}
          <div className="col-md-3">
            <Link
              to="/"
              className="d-flex align-items-center text-decoration-none mb-3 text-light"
            >
              <div
                className="bg-primary rounded d-flex align-items-center justify-content-center me-2"
                style={{ width: "32px", height: "32px" }}
              >
                <i className="bi bi-file-earmark-text text-white"></i>
              </div>
              <span className="fw-bold fs-5">Smart Copy</span>
            </Link>
            <p className="small">
              Your one-stop destination for all printing, copying, and
              stationery needs. Quality service at affordable prices.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-primary">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-danger">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://wa.me/1234567890" className="text-success">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href="mailto:info@smartcopy.com" className="text-info">
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6 className="fw-bold text-light mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none small">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-white text-decoration-none small"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/services"
                  className="text-white text-decoration-none small"
                >
                  Services
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-white text-decoration-none small"
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-3">
            <h6 className="fw-bold text-light mb-3">Our Services</h6>
            <ul className="list-unstyled">
              <li className="mb-2 text-light small">Printing & Copying</li>
              <li className="mb-2 text-light small">Document Services</li>
              <li className="mb-2 text-light small">Office Supplies</li>
              <li className="mb-2 text-light small">Custom Printing</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4">
            <h6 className="fw-bold text-light mb-3">Contact Info</h6>
            <div className="d-flex align-items-start mb-2">
              <i className="bi bi-geo-alt-fill text-white me-2 mt-1"></i>
              <span className="text-white small">
                123 Business Street, City, State 12345
              </span>
            </div>
            <div className="d-flex align-items-start mb-2">
              <i className="bi bi-telephone-fill text-white me-2 mt-1"></i>
              <span className="text-white small">+1 (555) 123-4567</span>
            </div>
            <div className="d-flex align-items-start mb-2">
              <i className="bi bi-envelope-fill text-white me-2 mt-1"></i>
              <span className="text-white small">info@smartcopy.com</span>
            </div>
          </div>
        </div>

        <hr className="my-4 border-light" />

        <div className="text-center">
          <p className="text-white small mb-0">
            &copy; 2024 Smart Copy & Stationery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
