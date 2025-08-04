const path = require("path");
const fs = require("fs");
const Team = require("../models/Team");

const addTeamMember = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file.filename;

    const newMember = new Team({ name, image });
    await newMember.save();

    res.status(201).json({ message: "Team member added", member: newMember });
  } catch (error) {
    res.status(500).json({ message: "Error adding team member", error });
  }
};

const getTeamMembers = async (req, res) => {
  try {
    const members = await Team.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team members", error });
  }
};

const deleteTeamMembers = async (req, res) => {
    try {
      const team = await Team.findByIdAndDelete(req.params.id);
      if (!team) return res.status(404).json({ message: "Service not found" });
  
      res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete Service", error: error.message });
    }
  };

  const getSingleTeamMember= async (req, res) => {
    try {
      const { id } = req.params;
      const team = await Team.findById(id);
      if (!team) {
        return res.status(404).json({ message: "team not found" });
      }
      res.status(200).json(team);
    } catch (err) {
      console.error("Fetch single team error:", err);
      res.status(500).json({ error: "Failed to get team", details: err.message });
    }
  };

  const updateTeam = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Log incoming data
      console.log("Update Body:", req.body);
      console.log("Update File:", req.file);
  
      // Find the team member
      const team = await Team.findById(id);
      if (!team) {
        return res.status(404).json({ message: "Team member not found" });
      }
  
      // Extract and sanitize new name (if any)
      const name = req.body.name?.trim();
      const updatedFields = {};
  
      if (name) updatedFields.name = name;
  
      // Handle image update if a new file is provided
      if (req.file) {
        if (team.image) {
          const oldImagePath = path.join(__dirname, "../uploads", team.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // delete old image file
          }
        }
        updatedFields.image = req.file.filename;
      }
  
      // Update the document
      const updatedTeam = await Team.findByIdAndUpdate(id, updatedFields, { new: true });
  
      res.status(200).json({
        message: "Team member updated successfully",
        team: updatedTeam,
      });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ error: "Failed to update team member", details: err.message });
    }
  };

module.exports = { addTeamMember, getTeamMembers, deleteTeamMembers, getSingleTeamMember, updateTeam };
