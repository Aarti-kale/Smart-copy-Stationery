import React, { useEffect, useState } from "react";
import "./styles/ProductCategories.css";
import axios from "../utils/axios.js";
import { BASE_URL } from "../config";

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  // Fetch categories
  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        setCategories(res.data.categories || res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  // Set responsive item count
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 992) {
        setItemsPerSlide(2); // Mobile/Tablet: 2 per slide
      } else {
        setItemsPerSlide(4); // Desktop: 4 per slide
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + itemsPerSlide;
        return nextIndex >= categories.length ? 0 : nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [categories, itemsPerSlide]);

  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + itemsPerSlide
  );

  return (
    <section className="why-section-custom py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5 animate-fade-in">
          Our Product Category
        </h2>
        <div className="row justify-content-center animate-fade-in">
          {visibleCategories.map((cat, index) => (
            <div
              className={`${
                itemsPerSlide === 4 ? "col-6 col-lg-3" : "col-6"
              } mb-4`}
              key={index}
            >
              <div className="category-card">
                <img
                  src={`${BASE_URL}/public/uploads/${cat.image}`}
                  alt={cat.name}
                  className="category-image"
                />
                <h5 className="category-name mt-3">{cat.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
