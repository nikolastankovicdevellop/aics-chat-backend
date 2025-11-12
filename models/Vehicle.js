const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
