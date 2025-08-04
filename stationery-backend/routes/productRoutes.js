// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, getPopularProducts, deleteProduct,updateProduct, getSingleProduct } = require('../controllers/productController');
const upload = require ('../middleware/upload');
const verifyAdmin = require('../middleware/verifyAdmin');
// Multer config for image upload


// Routes
router.get('/', getAllProducts);
router.get('/popular',getPopularProducts);
router.post('/',upload.single('image'),verifyAdmin,createProduct);
router.delete('/:id', verifyAdmin,deleteProduct);
router.get('/:id', verifyAdmin,getSingleProduct);
router.put('/:id',upload.single('image'), verifyAdmin,updateProduct);


module.exports = router;
