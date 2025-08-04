import React from "react";
// import '../components/HeroBanner.jsx';
import HeroBanner from "../components/HeroBanner.jsx";
import ProductCategories from "../components/ProductCategories.jsx";
import PopularProducts from "../components/PopularProducts.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Testimonials from "../components/Testimonials.jsx";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <ProductCategories />

      <PopularProducts />

      <WhyChooseUs />

      <Testimonials />
    </>
  );
};

export default Home;
