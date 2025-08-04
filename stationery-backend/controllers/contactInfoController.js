const path = require("path");
const fs = require("fs");
const ContactInfos = require('../models/ContactInfo');
// const verifyAdmin = require('../middleware/verifyAdmin');

const getContactInfo = async (req, res) => {
  try {

    const info = await ContactInfos.findOne(); // Assuming only one document
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get contact info' });
  }
};

const createContactInfo = async (req, res) => {
    try {
      const newInfo = new ContactInfos(req.body);
      const saved = await newInfo.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create contact info' });
    }
  };

  const getSingleInfo = async (req, res) => {
    try {
      const { id } = req.params;
      const info = await ContactInfos.findById(id);
      if (!info) {
        return res.status(404).json({ message: "info not found" });
      }
      res.status(200).json(info);
    } catch (err) {
      console.error("Fetch single info error:", err);
      res.status(500).json({ error: "Failed to get info", details: err.message });
    }
  };
  
  // 
  

  // const updateContactInfo = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  
  //     console.log("Update Body:", req.body);
  
  //     const contactInfo = await ContactInfos.findById(id);
  //     if (!contactInfo) {
  //       return res.status(404).json({ message: "Contact info not found" });
  //     }
  
  //     const updatedFields = {};
  //     const phone = req.body.phone?.trim();
  //     const email = req.body.email?.trim();
  //     const address = req.body.address?.trim();
  
  //     if (phone !== undefined) updatedFields.phone = phone;
  //     if (email !== undefined) updatedFields.email = email;
  //     if (address !== undefined) updatedFields.address = address;
  
  //     const updatedContact = await ContactInfos.findByIdAndUpdate(id, updatedFields, {
  //       new: true,
  //     });
  
  //     return res.status(200).json({
  //       message: "Contact info updated successfully",
  //       contact: updatedContact,
  //     });
  
  //   } catch (err) {
  //     console.error("Update error:", err);
  //     res.status(500).json({ error: "Failed to update contact info", details: err.message });
  //   }
  // };

  const updateContactInfo = async (req, res) => {
    try {
      const { id } = req.params;
      const { phone, email, address } = req.body;
  
      // Check if the record exists
      const existingInfo = await ContactInfos.findById(id);
      if (!existingInfo) {
        return res.status(404).json({ message: "Contact information not found" });
      }
  
      // Update fields
      existingInfo.phone = phone || existingInfo.phone;
      existingInfo.email = email || existingInfo.email;
      existingInfo.address = address || existingInfo.address;
  
      // Save updated record
      const updatedInfo = await existingInfo.save();
      res.status(200).json(updatedInfo);
    } catch (error) {
      console.error("Update ContactInfo Error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
module.exports = {
  getContactInfo,
  createContactInfo,
  getSingleInfo,
  updateContactInfo,
};

