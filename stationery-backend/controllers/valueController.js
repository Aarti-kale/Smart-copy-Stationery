const path = require("path");
const fs = require("fs");
const Value = require("../models/Value");

const addValue = async (req, res) => {
  try {
    const image = req.file?.filename;
    const { name, content } = req.body;

    const newValue = await Value.create({ image, name, content });
    res.status(201).json(newValue);
  } catch (err) {
    res.status(500).json({ error: "Failed to add value" });
  }
};

const getValues = async (req, res) => {
  try {
    const values = await Value.find();
    res.json(values);
  } catch (err) {
    res.status(500).json({ error: "Failed to get values" });
  }
};

const deleteValue = async (req, res) => {
  try {
    await Value.findByIdAndDelete(req.params.id);
    res.json({ message: "Value deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete value" });
  }
};


const getSingleValue = async (req, res) => {
  try {
    const { id } = req.params;
    const value = await Value.findById(id);
    if (!value) {
      return res.status(404).json({ message: "value not found" });
    }
    res.status(200).json(value);
  } catch (err) {
    console.error("Fetch single value error:", err);
    res.status(500).json({ error: "Failed to get value", details: err.message });
  }
};


const updateValue = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Update Body:", req.body);
    console.log("Update File:", req.file);

    const value = await Value.findById(id);
    if (!value) {
      return res.status(404).json({ message: "Value item not found" });
    }

    const name = req.body.name?.trim() || req.body["name "]?.trim(); // handle typo or extra space
    const content = req.body.content?.trim();
    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (content) updatedFields.content = content;

    // Handle image update
    if (req.file) {
      if (value.image) {
        const oldImagePath = path.join(__dirname, "../uploads", value.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete old image
        }
      }
      updatedFields.image = req.file.filename;
    }

    const updatedValue = await Value.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({
      message: "Value updated successfully",
      value: updatedValue,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update value", details: err.message });
  }
};
// Export all controller functions as a module
module.exports = {
  addValue,
  getValues,
  deleteValue,
  getSingleValue,
  updateValue,
};
