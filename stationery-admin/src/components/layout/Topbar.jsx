import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <nav
      className="d-flex justify-content-between align-items-center px-4"
      style={{
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
        height: "65px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.3)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: " 24px",
        marginLeft :" -12px",
        marginRight:"-15px"
      }}
    >
      
      <div className="d-flex align-items-center gap-2">
        <i className="bi bi-grid-1x2-fill fs-4 text-info"></i>
        <span
          className="fw-semibold fs-5"
          style={{ letterSpacing: "0.6px", color: "#f1f1f1" }}
        >
          Dashboard
        </span>
      </div>

      <div className="dropdown">
        <button
          className="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center gap-2"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            borderRadius: "30px",
            padding: "6px 16px",
            fontWeight: "500",
            backgroundColor: "#ffffff12",
            border: "1px solid #ffffff33",
            color: "#ffffff",
            transition: "all 0.3s ease",
          }}
        >
          <i className="bi bi-person-circle fs-5"></i> Admin
        </button>
        <ul className="dropdown-menu dropdown-menu-end shadow" style={{ minWidth: "160px" }}>
          {/* <li>
            <button
              className="dropdown-item d-flex align-items-center gap-2"
              onClick={() => navigate("/profile")}
            >
              <i className="bi bi-gear text-primary"></i> Profile
            </button>
          </li> 
           <li><hr className="dropdown-divider" /></li> */}
          <li>
            <button
              className="dropdown-item d-flex align-items-center gap-2 text-danger"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Topbar;


