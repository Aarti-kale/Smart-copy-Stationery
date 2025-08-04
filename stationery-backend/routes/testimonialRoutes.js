const express = require('express');
const router = express.Router();
const { getTestimonials, createTestimonial , deleteTestimonials, getSingleTestimonial, updateTestimonial} = require('../controllers/testimonialController');
const upload = require ('../middleware/upload');
const verifyAdmin = require('../middleware/verifyAdmin')

router.get('/', getTestimonials);
router.post('/', upload.single('image'),verifyAdmin, createTestimonial); 
router.delete('/:id', verifyAdmin,deleteTestimonials);
router.get('/:id',upload.single('image'), verifyAdmin,getSingleTestimonial);
router.put('/:id',upload.single('image'), verifyAdmin,updateTestimonial);

module.exports = router;
