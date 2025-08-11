const path = require("path");
const fs = require("fs");
const WhyChoose = require("../models/WhyChoose");
// Add new feature
const addWhyChoose = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const image = req.file.filename;

    const newItem = new WhyChoose({ title, desc, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add feature" });
  }
};

// Get all features
const getWhyChoose = async (req, res) => {
  try {
    const items = await WhyChoose.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch features" });
  }
};

const deleteWhychoose = async (req, res) => {
  try {
    const whychoose = await WhyChoose.findByIdAndDelete(req.params.id);
    if (!whychoose)
      return res.status(404).json({ message: "Whychoose  not found" });

    res.status(200).json({ message: "Whychoose deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete Whychoose", error: error.message });
  }
};

const getSingleWhychoose = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await WhyChoose.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (err) {
    console.error("Fetch single testimonial error:", err);
    res
      .status(500)
      .json({ error: "Failed to get testimonial", details: err.message });
  }
};

const updateWhychoose = async (req, res) => {
  try {
    const { id } = req.params;

    // Log incoming data
    console.log("Update Body:", req.body);
    console.log("Update File:", req.file);

    // Find the item
    const whychoose = await WhyChoose.findById(id);
    if (!whychoose) {
      return res.status(404).json({ message: "Whychoose item not found" });
    }

    // Get data safely
    const title = req.body.title?.trim() || req.body["title "]?.trim(); // also checks for extra space
    const desc = req.body.desc?.trim();
    const updatedFields = {};

    if (title) updatedFields.title = title;
    if (desc) updatedFields.desc = desc;

    // Handle image update if provided
    if (req.file) {
      if (whychoose.image) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads",
          whychoose.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // delete old image
        }
      }
      updatedFields.image = req.file.filename;
    }

    // Update the database
    const updatedWhychoose = await WhyChoose.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    res.status(200).json({
      message: "Whychoose item updated successfully",
      whychoose: updatedWhychoose,
    });
  } catch (err) {
    console.error("Update error:", err);
    res
      .status(500)
      .json({ error: "Failed to update Whychoose item", details: err.message });
  }
};

// Export both functions
module.exports = {
  addWhyChoose,
  getWhyChoose,
  deleteWhychoose,
  getSingleWhychoose,
  updateWhychoose,
};
