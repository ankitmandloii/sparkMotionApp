const Joi = require("joi");


// Define Joi validation schema for the event creation data
exports.eventValidationSchema = Joi.object({
  eventName: Joi.string().min(3).max(255).required(),  // Event name must be a string and required
  eventStartDate: Joi.date().required(),  // Start date must be in ISO date format and required
  eventEndDate: Joi.date().greater(Joi.ref('eventStartDate')).required(),  // End date must be after the start date
  utmParams: Joi.object().optional(),  // UTM parameters are optional but should follow specific rules if present
  expectedAttendees: Joi.number().integer().min(1).required(),  // Expected attendees must be an integer greater than 0
  location: Joi.string().min(3).max(255).required(),  // Location must be a string and required
  baseUrl: Joi.string().uri().optional(),  // baseUrl must be a valid URI
  destinationUrl: Joi.string().uri().optional(),  // destinationUrl must be a valid URI
  organizerIds: Joi.array().items(Joi.string().hex().length(24)).required(),  // Organizer IDs should be valid MongoDB ObjectIds
});

