// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//     title:String,
//     description : String,
//     icon:String,
// });

// module.exports = mongoose.model('Service', serviceSchema);
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // stores image filename
});

module.exports = mongoose.model('Service', serviceSchema);
