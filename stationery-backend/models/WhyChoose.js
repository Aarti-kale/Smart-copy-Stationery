const mongoose = require("mongoose");

const whyChooseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true }, // store filename
});

module.exports = mongoose.model("WhyChoose", whyChooseSchema);
