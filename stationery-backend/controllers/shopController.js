
const fs = require("fs");
const path = require("path");
const ShopInfo = require("../models/Shop");

// GET shop info
const getShop = async (req, res) => {
  try {
    const shop = await ShopInfo.findOne();
    res.status(200).json(shop);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch shop info" });
  }
};

// POST create shop info
const addShop = async (req, res) => {
  try {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    const content = req.body.content?.trim();
    const image = req.file ? req.file.filename : null;

    const newShop = new ShopInfo({ content, image });
    await newShop.save();

    res.status(201).json({ message: "Shop info created", shop: newShop });
  } catch (err) {
    res.status(500).json({ error: "Failed to add shop info" });
  }
};

// PUT update shop info
const updateShop = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Update Body:", req.body);
    console.log("Update File:", req.file);

    const shop = await ShopInfo.findById(id);
    if (!shop) return res.status(404).json({ message: "Shop info not found" });

    const content = req.body.content?.trim();

    const updatedFields = {};
    if (content) updatedFields.content = content;

    // If a new image is uploaded
    if (req.file) {
      if (shop.image) {
        const oldImagePath = path.join(__dirname, "../uploads", shop.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedFields.image = req.file.filename;
    }

    const updatedShop = await ShopInfo.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({ message: "Shop info updated", shop: updatedShop });
  } catch (err) {
    res.status(500).json({ error: "Failed to update shop info", details: err.message });
  }
};

// DELETE shop info (optional)
const deleteShop = async (req, res) => {
  try {
    const shop = await ShopInfo.findByIdAndDelete(req.params.id);
    if (!shop) return res.status(404).json({ message: "Shop info not found" });

    if (shop.image) {
      const imagePath = path.join(__dirname, "../uploads", shop.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: "Shop info deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete shop info", details: err.message });
  }
};

const getSingleShop = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await ShopInfo.findById(id);
    if (!shop) {
      return res.status(404).json({ message: "shop not found" });
    }
    res.status(200).json(shop);
  } catch (err) {
    console.error("Fetch single shop error:", err);
    res.status(500).json({ error: "Failed to get shop", details: err.message });
  }
};

module.exports = {
  getShop,
  addShop,
  updateShop,
  deleteShop,
  getSingleShop
};
