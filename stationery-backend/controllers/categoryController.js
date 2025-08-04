const path = require("path");
const fs = require("fs");
const Category = require('../models/Category');

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !image) {
      return res.status(400).json({ error: "Name and image are required" });
    }

    const category = new Category({ name, image });
    await category.save();

    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    console.error("error in addcategory:",error);
    res.status(500).json({ error: "Server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categories = await Category.findByIdAndDelete(req.params.id);
    if (!categories) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error: error.message });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Update Body:", req.body);
    console.log("Update File:", req.file);

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const name = req.body['name']?.trim() || req.body['name ']?.trim();
    const description = req.body.description?.trim();

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (description) updatedFields.description = description;

    // Handle image update
    if (req.file) {
      if (category.image) {
        const oldImagePath = path.join(__dirname, '../uploads', category.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedFields.image = req.file.filename;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({ message: "Category updated", category: updatedCategory });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update category", details: err.message });
  }
};


module.exports = { addCategory, getCategories,deleteCategory,updateCategory, getSingleCategory };
