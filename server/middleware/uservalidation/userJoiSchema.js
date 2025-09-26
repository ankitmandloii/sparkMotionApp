const Joi = require("joi");


exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // role: Joi.string().required(),
    // _id: Joi.string().required(),
});

exports.userRegisterSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("superAdmin", "organizer").required(),
    status: Joi.string().valid("active", "inactive").required(),
});

// Validation Schema for Update Organizer
exports.updateOrganizerSchema = Joi.object({
  userName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
  role: Joi.string().valid("superAdmin", "organizer").optional(),
  status: Joi.string().valid("active", "inactive").optional(),
});

// Validation for Delete Organizer
exports.deleteOrganizerSchema = Joi.object({
  id: Joi.string().required(),
});



