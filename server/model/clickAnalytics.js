const mongoose = require('mongoose');

const clickAnalyticsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },  // Link to the event
  ipAddress: String,
  location: {
    country: String,
    region: String,
    city: String,
    latitude: Number,
    longitude: Number,
  },
  utmSource: String,
  utmMedium: String,
  utmCampaign: String,
  utmContent: String,
  utmTerm: String,
  userAgent: String,  // User browser information
  referrer: String,   // Where the click came from (previous page)
  destinationUrl: String,
  timestamp: { type: Date, default: Date.now },  // Timestamp of the click
});

module.exports = mongoose.model('ClickAnalytics', clickAnalyticsSchema);
