import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import UpdateProduct from "./pages/products/UpdateProduct.jsx"
import UpdateCategory from './pages/Categories/UpdateCategories';
import UpdateService from './pages/Services/UpdateService';
import UpdateTestimonial from './pages/CustomerSay/UpdateTestimonial';
import UpdateWhyChoose from './pages/WhyChoose/UpdateWhyChoose';
import UpdateValue from './pages/Values/UpdateValue';
import UpdateTeam from './pages/Team/UpdateTeam';
import UpdateMission from './pages/Mission/UpdateMission';

function App() {
  return (
   <Routes>
    <Route path="/" element={<Login />} />
    {/* <Route path="/login" element={<Login />} /> */}
    {/* Add more routes as needed */}
     <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/profile" element={<Profile/>} />
     <Route path="/products/update-products/:id" element={<UpdateProduct />} />
     <Route path="/categories/update-category/:id" element={<UpdateCategory />} />
     <Route path='/services/update-service/:id' element ={<UpdateService />} /> 
     <Route path='/testimonials/:id' element={<UpdateTestimonial />} />    
     <Route path='/why-choose/:id' element={<UpdateWhyChoose />} />
     <Route path='/values/:id' element={<UpdateValue />} />
     <Route path='/team/:id' element={<UpdateTeam />} />
    <Route path='/mission/:id'element={<UpdateMission />} />
   </Routes>
  );
}

export default App;


