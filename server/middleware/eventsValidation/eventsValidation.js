const schema = require("./eventsJoiSchema.js");
const { statusCode } = require("../../constant/statusCodes.js");
const {sendResponse} = require("../../utils/sendResponse.js");


exports.createEventValidationData = async (req, res, next) => {
  const { error } = schema.eventValidationSchema.validate(req.body);
  if (error) {
   return sendResponse(res, statusCode.BAD_REQUEST, false, error.details[0].message);
  } else {
    next();
  }
};

exports.updateEventValidationData = async (req, res, next) => {
  const { error } = schema.updateEventValidationSchema.validate(req.body);
  if (error) {
   return sendResponse(res, statusCode.BAD_REQUEST, false, error.details[0].message);
  } else {
    next();
  }
};
