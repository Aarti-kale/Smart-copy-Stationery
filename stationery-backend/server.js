const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();

connectDB();

const app = express();
app.use(cors({ origin: ['https://smart-copy-stationery-admin.onrender.com', 'https://smart-copy-and-stationery-nzqi.onrender.com', 'https://smart-copy-and-stationery.onrender.com'], credentials: true }));

app.use(express.json());
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads'))); // image access

// routes
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/testimonials',require('./routes/testimonialRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/contact-info', require('./routes/contactInfoRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/why-choose', require('./routes/whyChooseRoutes'));
app.use('/api/shop', require('./routes/shopRoutes'));
app.use('/api/mission', require('./routes/MissionRoutes'));
app.use('/api/values', require('./routes/valueRoutes'));
app.use('/api/team',require('./routes/teamRoutes'));
app.use('/api/admin/login', require('./routes/adminRoutes'));



const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})