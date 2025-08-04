const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  image: {
    type: String, // filename only, served from `uploads/`
    required: true,
  },
});

module.exports = mongoose.model("Team", teamSchema);
