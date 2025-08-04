const path = require("path");
const fs = require("fs");
const Service = require('../models/Service');

// GET all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

// POST create service
const createService = async (req, res) => {
  try {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    const title = req.body.title?.trim();
    const description = req.body.description?.trim();
    const image = req.file ? req.file.filename : null;

    const newService = new Service({ title, description, image });
    await newService.save();

    res.status(201).json({ message: 'Service created', service: newService });
  } catch (err) {
    res.status(500).json({ error: 'Service creation failed' });
  }
};

const deleteService = async (req, res) => {
  try {
    const services = await Service.findByIdAndDelete(req.params.id);
    if (!services) return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Service", error: error.message });
  }
};

const getSingleService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (err) {
    console.error("Fetch single service error:", err);
    res.status(500).json({ error: "Failed to get service", details: err.message });
  }
};


const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Update Body:", req.body);
    console.log("Update File:", req.file);

    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const name = req.body['name']?.trim() || req.body['name ']?.trim();
    const description = req.body.description?.trim();
    const icon = req.body.icon?.trim();

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (description) updatedFields.description = description;
    if (icon) updatedFields.icon = icon;

    // Handle image update
    if (req.file) {
      if (service.image) {
        const oldImagePath = path.join(__dirname, '../uploads', service.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete old image
        }
      }
      updatedFields.image = req.file.filename;
    }

    const updatedService = await Service.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json({ message: "Service updated", service: updatedService });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update service", details: err.message });
  }
};



module.exports = {
  getAllServices,
  createService,
  deleteService,
  getSingleService,
  updateService,
};
