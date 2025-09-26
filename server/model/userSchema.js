// const { number, required } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superAdmin', 'organizer'], required: true },
  status: { type: String, enum: ['active', 'inactive'], required: true },
  tokenVersion: { type: Number, default: 0 }
}, { timestamps: true });





module.exports  = mongoose.model('User', userSchema);
