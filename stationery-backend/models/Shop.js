const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String, // store image URL or base64
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("ShopInfo", shopSchema);
