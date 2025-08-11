import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import ProtectedRoute from './components/layout/protectedRoutes';
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
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

     <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
         <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
     <Route path="/products/update-products/:id" element={ <ProtectedRoute> <UpdateProduct /> </ProtectedRoute> } />
     <Route path="/categories/update-category/:id" element={ <ProtectedRoute> <UpdateCategory /> </ProtectedRoute> } />
     <Route path='/services/update-service/:id' element ={ <ProtectedRoute> <UpdateService /> </ProtectedRoute>} /> 
     <Route path='/testimonials/:id' element={ <ProtectedRoute>   <UpdateTestimonial /> </ProtectedRoute>} />    
     <Route path='/why-choose/:id' element={ <ProtectedRoute> <UpdateWhyChoose /> </ProtectedRoute> } />
     <Route path='/values/:id' element={ <ProtectedRoute><UpdateValue /> </ProtectedRoute> } />
     <Route path='/team/:id' element={ <ProtectedRoute> <UpdateTeam /> </ProtectedRoute>  } />
    <Route path='/mission/:id'element={<ProtectedRoute> <UpdateMission /> </ProtectedRoute>} />
   </Routes>
  );
}

export default App;


