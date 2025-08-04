// import { useState } from "react";
// import { FaChevronDown, FaChevronRight } from "react-icons/fa";
// // import {Side} from "./Side.css"; // Assuming you have a CSS file for styles
// function Sidebar({ setActiveTab }) {
//   const [openTab, setOpenTab] = useState(null);
//   const [activeSubTab, setActiveSubTab] = useState("");

//   const toggleTab = (tab) => {
//     setOpenTab(openTab === tab ? null : tab);
//   };

//   const mainButton = (label, tab) => (
//     <div
//       onClick={() => toggleTab(tab)}
//       className="w-100 d-flex justify-content-between align-items-center px-2 py-2 sidebar-item"
//       style={{ cursor: "pointer", color: "#ffffff", fontWeight: "500" }}
//     >
//       <span>{label}</span>
//       {openTab === tab ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
//     </div>
//   );

//   const subTabButton = (label, value) => (
//     <div
//       className={`ps-4 py-2 w-100 sidebar-subitem ${
//         activeSubTab === value ? "active-subtab" : ""
//       }`}
//       style={{
//         cursor: "pointer",
//         color: "#ffffff",
//         fontSize: "14px",
//         transition: "0.3s",
//       }}
//       onClick={() => {
//         setActiveTab(value);
//         setActiveSubTab(value);
//       }}
//     >
//       {label}
//     </div>
//   );

//   return (
//     <div
//       className="text-white p-3 d-none d-md-block"
//       style={{
//         width: "220px",
//         minHeight: "100vh",
//         backgroundColor: "#2c2f48",
//       }}
//     >
//       <h5 className="text-center mb-4">Amol Stationery Admin</h5>
//       <div className="d-flex flex-column gap-1">

//         {mainButton("Products", "products")}
//         {openTab === "products" && (
//           <>
//             {subTabButton("All Products", "products-all")}
//             {subTabButton("Add Product", "products-add")}
//           </>
//         )}

//         {mainButton("Categories", "categories")}
//         {openTab === "categories" && (
//           <>
//             {subTabButton("All Categories", "category-all")}
//             {subTabButton("Add Category", "category-add")}
//           </>
//         )}


//         {mainButton("Services", "services")}
//         {openTab === "services" && (
//           <>
//             {subTabButton("All Services", "services-all")}
//             {subTabButton("Add Service", "services-add")}
//           </>
//         )}

       

//         {mainButton("Customer Say", "testimonials")}
//         {openTab === "testimonials" && (
//           <>
//             {subTabButton("All Testimonials", "testimonials-all")}
//             {subTabButton("Add Testimonial", "testimonials-add")}
//           </>
//         )}

//         {mainButton("Why Choose Us", "whychoose")}
//         {openTab === "whychoose" && (
//           <>
//             {subTabButton("All WhyChoose", "whychoose-all")}
//             {subTabButton("Add WhyChoose", "whychoose-add")}
//             {subTabButton("Update Whychose","whychoose-update")}
//           </>
//         )}

// {mainButton("Mission", "mission")}
//         {openTab === "mission" && (
//           <>
//             {subTabButton("All Mission", "mission-all")}
//             {subTabButton("Add Mission", "mission-add")}
//           </>
//         )}

// {mainButton("Our Team", "team")}
//         {openTab === "team" && (
//           <>
//             {subTabButton("All team", "team-all")}
//             {subTabButton("Add team", "team-add")}
//           </>
//         )}

// {mainButton("Our Values", "value")}
//         {openTab === "value" && (
//           <>
//             {subTabButton("All value", "value-all")}
//             {subTabButton("Add value", "value-add")}
//           </>
//         )}
        
//         {/* {mainButton("WhatsApp Orders", "whatsapp")}
//         {openTab === "whatsapp" && (
//           <>
//             {subTabButton("View Orders", "whatsapp-orders")}
//           </>
//         )} */}

//         {mainButton("Contact Us", "contact")}
//         {openTab === "contact" && (
//           <>
//             {subTabButton("Messages", "contact-messages")}
//             {subTabButton("Address Details", "contact-address")}
//           </>
//         )}
        
//       </div>
//     </div>
//   );
// }

// export default Sidebar;





import { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaBoxOpen,
  FaTags,
  FaServicestack,
  FaComments,
  FaStar,
  FaBullseye,
  FaUsers,
  FaGem,
  FaEnvelope,
} from "react-icons/fa";

function Sidebar({ setActiveTab }) {
  const [openTab, setOpenTab] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState("");

  const toggleTab = (tab) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  const mainButton = (label, tab, icon) => (
    <div
      onClick={() => toggleTab(tab)}
      className="w-100 d-flex justify-content-between align-items-center px-3 py-2 sidebar-item"
      style={{
        cursor: "pointer",
        color: "#ffffff",
        fontWeight: "bold",
        transition: "0.3s",
      }}
    >
      <div className="d-flex align-items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      {openTab === tab ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
    </div>
  );

  const subTabButton = (label, value) => (
    <div
      className={`ps-5 py-2 w-100 sidebar-subitem ${
        activeSubTab === value ? "active-subtab" : ""
      }`}
      style={{
        cursor: "pointer",
        color: activeSubTab === value ? "#ffd700" : "#ffffff",
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: activeSubTab === value ? "#ffffff22" : "transparent",
        borderRadius: "4px",
        transition: "0.3s",
      }}
      onClick={() => {
        setActiveTab(value);
        setActiveSubTab(value);
      }}
    >
      {label}
    </div>
  );

  return (
    <div
      className="text-white p-3 d-none d-md-block"
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <h5 className="text-center fw-bold mb-4">Amol Stationery Admin</h5>
      <div className="d-flex flex-column gap-1">

        {mainButton("Products", "products", <FaBoxOpen />)}
        {openTab === "products" && (
          <>
            {subTabButton("All Products", "products-all")}
            {subTabButton("Add Product", "products-add")}
          </>
        )}

        {mainButton("Categories", "categories", <FaTags />)}
        {openTab === "categories" && (
          <>
            {subTabButton("All Categories", "category-all")}
            {subTabButton("Add Category", "category-add")}
          </>
        )}

        {mainButton("Services", "services", <FaServicestack />)}
        {openTab === "services" && (
          <>
            {subTabButton("All Services", "services-all")}
            {subTabButton("Add Service", "services-add")}
          </>
        )}

        {mainButton("Customer Say", "testimonials", <FaComments />)}
        {openTab === "testimonials" && (
          <>
            {subTabButton("All Testimonials", "testimonials-all")}
            {subTabButton("Add Testimonial", "testimonials-add")}
          </>
        )}

        {mainButton("Why Choose Us", "whychoose", <FaStar />)}
        {openTab === "whychoose" && (
          <>
            {subTabButton("All WhyChoose", "whychoose-all")}
            {subTabButton("Add WhyChoose", "whychoose-add")}
          </>
        )}

{mainButton("About Shop", "aboutshop", <FaStar />)}
        {openTab === "aboutshop" && (
          <>
            {subTabButton("Shop Info", "shop-info")}
          </>
        )}

        {mainButton("Mission", "mission", <FaBullseye />)}
        {openTab === "mission" && (
          <>
            {subTabButton("All Mission", "mission-all")}
            {subTabButton("Add Mission", "mission-add")}
          </>
        )}

        {mainButton("Our Team", "team", <FaUsers />)}
        {openTab === "team" && (
          <>
            {subTabButton("All team", "team-all")}
            {subTabButton("Add team", "team-add")}
          </>
        )}

        {mainButton("Our Values", "value", <FaGem />)}
        {openTab === "value" && (
          <>
            {subTabButton("All value", "value-all")}
            {subTabButton("Add value", "value-add")}
          </>
        )}

        {mainButton("Contact Us", "contact", <FaEnvelope />)}
        {openTab === "contact" && (
          <>
            {subTabButton("Messages", "contact-messages")}
            {subTabButton("Address Details", "contact-address")}
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
