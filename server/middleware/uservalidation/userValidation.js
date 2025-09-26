const schema = require("../../middleware/uservalidation/userJoiSchema.js");
const { statusCode } = require("../../constant/statusCodes.js");
const { ErrorMessage } = require("../../constant/messages.js");
const { sendResponse } = require("../../utils/sendResponse.js");
const Event = require("../../model/eventSchema.js");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const crypto = require('crypto');


exports.login = async (req, res, next) => {
  const { error } = schema.loginSchema.validate(req.body);
  if (error) {
    res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
  } else {
    next();
  }
};

exports.userRegister = async (req, res, next) => {
  const { error } = schema.userRegisterSchema.validate(req.body);
  if (error) {
    res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
  } else {
    next();
  }
};



exports.updateOrganizer = async (req, res, next) => {
  const { error } = schema.updateOrganizerSchema.validate(req.body);
  if (error) {
    res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
  } else {
    next();
  }
};

exports.deleteOrganizer = async (req, res, next) => {
  const { error } = schema.deleteOrganizerSchema.validate(req.params);
  if (error) {
    res.status(statusCode.BAD_REQUEST).json({ error: error.details[0].message });
  } else {
    next();
  }

};

// const findUserById = async (id) => {
//   return await User.findById(id);
// };


exports.checkAdminPermission = (req, res, next) => {
  console.log("User Role:", req.user.role); // Debugging line to check the role
  if (req.user.role !== 'superAdmin') {
    return sendResponse(res, statusCode.FORBIDDEN, false, ErrorMessage.NOT_AUTHORIZED);
  }
  console.log("SAdmin permission granted");
  next();
};


exports.checkOrganizerPermission = (req, res, next) => {
  if (req.user.role !== 'organizer') {
    return sendResponse(res, statusCode.FORBIDDEN, false, ErrorMessage.NOT_AUTHORIZED);
  }
  next();
};


exports.checkEventViewPermission = (req, res, next) => {
  const { eventId } = req.params;
  const userId = req.user._id;

  // If the user is an Admin, they can view any event
  if (req.user.role === 'superAdmin') {
    return next();
  }

  // If the user is an Organizer, they can only view events they created or were assigned to
  Event.findById(eventId, (err, event) => {
    if (err || !event) {
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.EVENT_NOT_FOUND);
    }
    // Check if the organizer is part of the event or created the event
    if (event.createdBy.toString() === userId || event.organizers.includes(userId)) {
      return next();
    }
    return sendResponse(res, statusCode.FORBIDDEN, false, ErrorMessage.NOT_AUTHORIZED);
  });
};

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("Authorization Header:", authHeader); // Debugging line to check the header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Get token from Bearer <token>

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
  

    req.user = decoded;

    // console.log("Decoded User:", req.user); // Debugging line to check the decoded token
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};



