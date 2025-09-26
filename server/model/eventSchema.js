const mongoose = require("mongoose");
const { de } = require("zod/v4/locales");

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventStartDate: { type: Date },
  eventEndDate: { type: Date },
  utmParams: {
    utm_source: String,
    utm_medium: String,
    utm_campaign: String,
    utm_term: String,
    utm_content: String,
  },
  expectedAttendees: Number,
  location: String,
  baseUrl: String, // bracelet base URL (e.g., sparkmotion.com/e/123)
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Super Admin
  organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }, { default: [] }], // Event Organizers
  status: { type: String, enum: ["Upcoming", "Active", "Completed"], default: "Upcoming" },
  destinationUrl: String, // Organizer’s chosen redirect target
  clickCount: { type: Number, default: 0 },  // New field to track click count
  postEventClickCount: { type: Number, default: 0 },  
}, { timestamps: true });''



module.exports = mongoose.model("Event", eventSchema);