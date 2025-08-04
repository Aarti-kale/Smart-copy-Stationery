const path = require("path");
const fs = require("fs");
const Mission = require("../models/Mission");

const addMission = async (req, res) => {
  try {
    const { name, content } = req.body;
    const image = req.file?.filename;

    if (!image || !name || !content) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const shop = new Mission({ image, name, content });
    await shop.save();

    res.status(201).json({ message: "Shop info added", data: shop });
  } catch (error) {
    console.error("Error adding shop info:", error);
    res.status(500).json({ error: "Failed to add shop info" });
  }
};

const getMission = async (req, res) => {
  try {
    const data = await Mission.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shop info" });
  }
};

const deleteMission = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndDelete(req.params.id);
    if (!mission) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Service", error: error.message });
  }
};

const getSingleMission = async (req, res) => {
  try {
    const { id } = req.params;
    const mission = await Mission.findById(id);
    if (!mission) {
      return res.status(404).json({ message: "mission not found" });
    }
    res.status(200).json(mission);
  } catch (err) {
    console.error("Fetch single mission error:", err);
    res.status(500).json({ error: "Failed to get mission", details: err.message });
  }
};

const updateMission = async (req, res) => {
  try {
    const { id } = req.params;

    // Log request
    console.log("Update Body:", req.body);
    console.log("Update File:", req.file);

    // Find existing mission
    const mission = await Mission.findById(id);
    if (!mission) {
      return res.status(404).json({ message: "Mission not found" });
    }

    // Prepare update fields
    const updatedFields = {};

    if (req.body.name?.trim()) updatedFields.name = req.body.name.trim();
    if (req.body.content?.trim()) updatedFields.content = req.body.content.trim();

    // If new image uploaded, remove old one
    if (req.file) {
      if (mission.image) {
        const oldImagePath = path.join(__dirname, "../uploads", mission.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedFields.image = req.file.filename;
    }

    // Update mission
    const updatedMission = await Mission.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({
      message: "Mission updated successfully",
      mission: updatedMission,
    });
  } catch (error) {
    console.error("Error updating mission:", error);
    res.status(500).json({ error: "Failed to update mission", details: error.message });
  }
};


module.exports = {
  addMission,
  getMission,
  deleteMission,
  getSingleMission,
  updateMission
};
