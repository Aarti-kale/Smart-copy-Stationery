const express = require('express');
const router = express.Router();
const { getCategories, addCategory,deleteCategory, getSingleCategory, updateCategory } = require('../controllers/categoryController');
const upload = require ('../middleware/upload');
const verifyAdmin = require("../middleware/verifyAdmin");

router.post('/',upload.single('image'),verifyAdmin,addCategory);

router.get('/', getCategories);
router.delete('/:id', verifyAdmin,deleteCategory);
router.get('/:id',upload.single('image'), verifyAdmin,getSingleCategory);
router.put('/:id',upload.single('image'), verifyAdmin,updateCategory);

module.exports=router;