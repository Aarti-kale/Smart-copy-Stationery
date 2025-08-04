const path = require("path");
const fs = require("fs");
const Testimonial = require('../models/Testimonial');

// @desc Get all testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error });
  }
};


// POST create testimonial
const createTestimonial = async (req, res) => {
  try {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    const name =  req.body.name?.trim();
    const role =  req.body.role?.trim();
    const feedback = req.body.feedback?.trim();

    const image = req.file ? req.file.filename : null;

    if (!name || !role || !feedback) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTestimonial = new Testimonial({
      name,
      role,
      feedback,
      image,
    });

    await newTestimonial.save();
    res.status(201).json({ message: "Testimonial created", testimonial: newTestimonial });

  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({ message: 'Error creating testimonial', error });
  }
};

const deleteTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonials) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Testimonials deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Testimonials", error: error.message });
  }
};

const getSingleTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (err) {
    console.error("Fetch single testimonial error:", err);
    res.status(500).json({ error: "Failed to get testimonial", details: err.message });
  }
};


const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Update Body:", req.body);
    console.log("Update File:", req.file);

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    const name = req.body.name?.trim() || req.body["name "]?.trim(); // handle accidental trailing space
    const role = req.body.role?.trim();
    const feedback = req.body.feedback?.trim();

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (role) updatedFields.role = role;
    if (feedback) updatedFields.feedback = feedback;

    // Handle image update
    if (req.file) {
      if (testimonial.image) {
        const oldImagePath = path.join(__dirname, "../uploads", testimonial.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete old image
        }
      }
      updatedFields.image = req.file.filename;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({
      message: "Testimonial updated successfully",
      testimonial: updatedTestimonial,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update testimonial", details: err.message });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  deleteTestimonials,
  getSingleTestimonial,
  updateTestimonial,
};
