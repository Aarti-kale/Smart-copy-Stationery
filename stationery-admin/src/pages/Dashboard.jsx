import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import AllProducts from "../pages/products/AllProducts";
import AddProduct from "./products/AddProduct";

import AddCategory from "./Categories/AddCategory";
import AllCategory from "./Categories/AllCategory";

import AddressDetails from "./ContactUs/AddressDetails";
import ContactForm from "./ContactUs/ContactForm";

import AllServices from "./Services/AllServices";
import AddService from "./Services/AddService";

import AllTestimonial from "./CustomerSay/AllTestimonial";
import AddTestimonial from "./CustomerSay/AddTestimonial";

import AllWhyChoose from "./WhyChoose/AllWhyChoose";
import AddWhyChoose from "./WhyChoose/AddWhyChoose";

import Shop from "./AboutShop/Shop";

import AddMission from "./Mission/AddMission";
import AllMission from "./Mission/AllMission";
import AllTeam from "./Team/AllTeam";
import AddTeam from "./Team/AddTeam";

import AllValues from "./Values/AllValues";
import AddValue from "./Values/AddValue";
function Dashboard() {
  const [activeTab, setActiveTab] = useState("products-all");

  const renderTab = () => {
    switch (activeTab) {
      case "products-all":
        return <AllProducts />;
      case "products-add":
        return <AddProduct />;

      case "category-add":
        return <AddCategory />;
      case "category-all":
        return <AllCategory />;

      case "contact-address":
        return <AddressDetails />;
      case "contact-messages":
        return <ContactForm />;

      case "services-all":
        return <AllServices />;
      case "services-add":
        return <AddService />;

      case "testimonials-all":
        return <AllTestimonial />;
      case "testimonials-add":
        return <AddTestimonial />;

      case "whychoose-all":
        return <AllWhyChoose />;

      case "whychoose-add":
        return <AddWhyChoose />;
      // case "whychoose-update" : return <UpdateWhyChoose />;

      case "shop-info":
        return <Shop />;

      case "mission-all":
        return <AllMission />;
      case "mission-add":
        return <AddMission />;

      case "team-all":
        return <AllTeam />;
      case "team-add":
        return <AddTeam />;

      case "value-all":
        return <AllValues />;
      case "value-add":
        return <AddValue />;

      default:
        return <AllProducts />;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar setActiveTab={setActiveTab} />
        <div className="col-10">
          <Topbar />
          <div className="p-3">
            {renderTab()}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
