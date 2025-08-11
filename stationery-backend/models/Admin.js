const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken : { type: String, default:null},
  resetTokenExpiration : Date,
});

module.exports = mongoose.model('Admin', adminSchema);
