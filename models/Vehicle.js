const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    marka: String,
    model: String,
    godiste: Number,
    cena: Number,
    kilometraza: Number,
    opis: String
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
