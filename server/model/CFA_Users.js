// const { number, required } = require('joi');
const mongoose = require('mongoose');

const CFA_Users_Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    organization: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CFA_Users', CFA_Users_Schema);
