// controllers/productController.js
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// POST create product
const createProduct = async (req, res) => {
  try {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    const name = req.body['name']?.trim() || req.body['name ']?.trim();
const price = req.body['price']?.trim() || req.body['price ']?.trim();
const description = req.body.description?.trim();
const isPopular = req.body.isPopular === 'true'; // convert string to boolean

    const image = req.file ? req.file.filename : null;

    const newProduct = new Product({ name, price, description, image, isPopular });
    await newProduct.save();

    res.status(201).json({ message: 'Product created', product: newProduct });
  } catch (err) {
    res.status(500).json({ error: 'Product creation failed' });
  }
};

 const getPopularProducts = async (req, res) => {
    try {
      const products = await Product.find({ isPopular: true });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch popular products' });
    }
  };


 // @desc    Delete product (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Update Body:", req.body);
    console.log("Update File:", req.file);

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const name = req.body['name']?.trim() || req.body['name ']?.trim();
    const price = req.body['price']?.trim() || req.body['price ']?.trim();
    const description = req.body.description?.trim();

    // Prepare updated fields
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (price) updatedFields.price = price;
    if (description) updatedFields.description = description;

    // If a new image is uploaded, handle image replacement
    if (req.file) {
      if (product.image) {
        const oldImagePath = path.join(__dirname, '../uploads', product.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // delete old image
        }
      }
      updatedFields.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update product", details: err.message });
  }
};
    




module.exports = {
  getAllProducts,
  createProduct,
  getPopularProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct,
};
