const services = require("../services/auth.service.js");
const bcrypt = require('bcrypt');
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constant/messages.js");
const { statusCode } = require("../constant/statusCodes.js");
const User = require("../model/userSchema.js");


exports.signUp = async (req, res) => {
  try {
    const { userName, email, phoneNumber, password, role, status } = req.body;

    const result = await services.signUp(userName, email, phoneNumber, password, role, status);
    if (!result) {
      //console.log(result, "INTERNAL_SERVER_ERROR")
      return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.USER_ALREADY_EXIST);
    }
    return sendResponse(res, statusCode.OK, true, SuccessMessage.SIGNUP_SUCCESS, result);
  } catch (error) {
    //console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};


exports.createOrganizer = async (req, res) => {
  try {
    const { userName, email, phoneNumber, password, role, status } = req.body;

    // Call the existing signup service for creating an organizer
    const result = await services.signUp(userName, email, phoneNumber, password, role, status);

    if (!result) {
      return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.USER_ALREADY_EXIST);
    }

     const organizerDashboardLink = process.env.ORGANIZER_DASHBOARD_LINK || 'http://localhost:8080/dashboard';
    // Send email to the organizer after account creation
    const sendEmailResult = await services.sendWelcomeOrganizerEmail(email, password, organizerDashboardLink);

    if (!sendEmailResult) {
      return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.EMAIL_SEND_FAILED);
    }

    return sendResponse(res, statusCode.OK, true, SuccessMessage.ORGANIZER_CREATE_SUCCESS, result);
  } catch (error) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await services.findUserForLogin(email);

    if (!user) {
      return sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.USER_NOT_FOUND);
    }

  


    const loginResult = await services.passwordCompareForLogin(user, password);
    if (!loginResult) {
      return sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.WRONG_EMAIL_OR_PASSWORD);
    }

    return sendResponse(res, statusCode.OK, true, SuccessMessage.LOGIN_SUCCESS, loginResult);


  } catch (error) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, `${error.message}`);
  }
};


// Controller for getting all organizers
exports.getOrganizersList = async (req, res) => {
  try {
    const organizers = await services.findAllOrganizers();
    if (organizers.length === 0) {
      console.log("No organizers found");
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.NO_ORGANIZERS_FOUND);
    }

    return sendResponse(res, statusCode.OK, true, SuccessMessage.ORGANIZERS_FETCH_SUCCESS, organizers);
  } catch (error) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};


// Controller for Get Organizer by ID
exports.getOrganizerById = async (req, res) => {
  try {
    const { id } = req.params;

    const organizer = await services.findOrganizerById(id);
    if (!organizer) {
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.USER_NOT_FOUND);
    }

    return sendResponse(res, statusCode.OK, true, SuccessMessage.ORGANIZERS_FETCH_SUCCESS, organizer);
  } catch (error) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};



// Controller for Update Organizer
exports.updateOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, phoneNumber, role, status } = req.body;

    // Find the organizer and update
    const updatedOrganizer = await services.updateOrganizerById(id, userName, email, phoneNumber, role, status);
    if (!updatedOrganizer) {
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.USER_NOT_FOUND);
    }

    return sendResponse(res, statusCode.OK, true, SuccessMessage.ORGANIZER_UPDATE_SUCCESS, updatedOrganizer);
  } catch (error) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};


// Controller for Delete Organizer
exports.deleteOrganizer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrganizer = await services.deleteOrganizerById(id);
    if (!deletedOrganizer) {
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.USER_NOT_FOUND);
    }

    return sendResponse(res, statusCode.OK, true, SuccessMessage.ORGANIZER_DELETE_SUCCESS);
  } catch (error) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

exports.validate = async (req, res) => {
  return res.status(200).json({ success: true, message: 'Token is valid' });
};



exports.adminChangePassword = async (req, res) => {
  try {

    const { email, oldPassword, newPassword } = req.body;

    // Fetch the user
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.SUPERADMIN_NOT_FOUND, email);

    // Ensure the user is the superadmin
    if (user.role !== 'superAdmin') {
      return sendResponse(res, statusCode.FORBIDDEN, false, ErrorMessage.ONLY_SUPERADMIN_CAN_CHANGE_PASSWORD, email);
    }

    // Validate current password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.WRONG_EMAIL_OR_PASSWORD, email);

    // Prevent reusing the same password
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.NEWPASSWORD_SAME_AS_OLD, email);

    // Hash and update the new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedNewPassword;
    await user.save();

    return sendResponse(res, statusCode.OK, true, SuccessMessage.PASSWORD_CHANGED_SUCCESSFULLY, email);
  } catch (error) {
    console.error('Admin change password error:', error);
    return false;
  }
};























