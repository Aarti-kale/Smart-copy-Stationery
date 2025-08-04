import React, { useEffect } from "react";
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom';
import AOS from 'aos';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import About from "./pages/About"
import Products from "./pages/Products";
import Services from "./pages/Services";
import WhatsappOrder from "./pages/WhatsappOrder";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  
  return (
    <Router>
      <div style={{backgroundColor : '#FAFAFA', minHeight:'100vh'}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/about" element={<About/>} />
           <Route path="/products" element={<Products/>} />
           <Route path="/services" element={<Services/>} />
           <Route path="/whatsapp-order" element={<WhatsappOrder />} />

          <Route path="/contact" element={<Contact/>} /> 
        </Routes>
        <Footer />
      </div>
    </Router>    );
}

export default App;
