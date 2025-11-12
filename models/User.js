const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: Number, unique: true, required: true }, 
  email: { type: String, required: true },
  registered: { type: Boolean, default: false },
}, { timestamps: true }); 

module.exports = mongoose.model('User', UserSchema);
