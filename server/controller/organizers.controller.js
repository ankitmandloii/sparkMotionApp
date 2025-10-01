const { signUp } = require('../services/auth.service.js'); // Import the existing signup service
const { sendResponse } = require('../utils/sendResponse.js');
const { statusCode } = require('../constant/statusCodes.js');
const { ErrorMessage, SuccessMessage } = require('../constant/messages.js');
const organizersService = require('../services/organizers.service.js');  // Import email service
const eventSchema = require('../model/eventSchema.js'); // Import Event model for fetching assigned events
const User = require('../model/userSchema.js');


exports.createOrganizer = async (req, res) => {
  const session = await User.startSession();  // Create a session for handling rollback in case of failure
  session.startTransaction();

  try {
    const { userName, email, phoneNumber, password, role, status } = req.body;

    // Step 1: Create the organizer user
    const result = await signUp(userName, email, phoneNumber, password, role, status);

    if (!result) {
      // If the user already exists or something went wrong, end the transaction
      return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.USER_ALREADY_EXIST);
    }

    // Step 2: Send the welcome email
    const organizerDashboardLink = process.env.ORGANIZER_DASHBOARD_LINK;
    const sendEmailResult = await organizersService.sendWelcomeOrganizerEmail({ email, password, organizerDashboardLink });

    if (!sendEmailResult) {
      // If the email fails, remove the organizer from the database
      await User.findByIdAndDelete(result._id);
      // Commit the transaction to rollback any changes
      await session.commitTransaction();
      return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.EMAIL_SEND_FAILED);
    }

    // Step 3: Commit the transaction to save the user data permanently
    await session.commitTransaction();

    return sendResponse(res, statusCode.CREATED, true, SuccessMessage.ORGANIZER_CREATE_SUCCESS, result);

  } catch (error) {
    // In case of any other errors, rollback the transaction
    await session.abortTransaction();
    console.error('Error in createOrganizer controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  } finally {
    // End the session regardless of success/failure
    session.endSession();
  }
};





exports.getOrganizerById = async (req, res) => {
  try {
    const { id } = req.params;  // Get organizer ID from the route params

    // Fetch the organizer by ID
    const organizer = await organizersService.findOrganizerById(id);
    if (!organizer) {
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.ORGANIZER_NOT_FOUND);
    }

    // Fetch events where the organizer is assigned
    const assignedEvents = await eventSchema.find({ organizers: id });

    return sendResponse(res, statusCode.OK, true, SuccessMessage.ORGANIZER_FETCH_SUCCESS, {
      organizer,
      assignedEvents  // Return the events the organizer is assigned to
    });
  } catch (error) {
    console.error('Error fetching organizer details:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};



// Controller for Update Organizer
exports.updateOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, phoneNumber, role, status } = req.body;

    // Find the organizer and update
    const updatedOrganizer = await organizersService.updateOrganizerById(id, userName, email, phoneNumber, role, status);
    if (!updatedOrganizer) {
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.ORGANIZER_NOT_FOUND);
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

    const deletedOrganizer = await organizersService.deleteOrganizerById(id);
    if (!deletedOrganizer) {
      return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.ORGANIZER_NOT_FOUND);
    }

    return sendResponse(res, statusCode.OK, true, SuccessMessage.ORGANIZER_DELETE_SUCCESS, deletedOrganizer);
  } catch (error) {
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};


// Controller for getting all organizers
exports.getOrganizers = async (req, res) => {
  try {
    // You can take pagination params from req.query instead of req.body (more common in APIs)
    const { page = 1, limit = 10, searchQuery } = req.query;

    // Fetch organizers with pagination
    const organizersResult = await organizersService.findAllOrganizers(page, limit, searchQuery);

    // If no organizers found
    if (organizersResult.data.length === 0) {
      return sendResponse(
        res,
        statusCode.OK,
        false,
        ErrorMessage.NO_ORGANIZERS_FOUND,
        []
      );
    }

    // For each organizer, fetch their assigned events
    const organizersWithEvents = await Promise.all(
      organizersResult.data.map(async (organizer) => {
        const assignedEvents = await eventSchema.find({ organizers: organizer._id });
        return {
          ...organizer.toObject(),
          assignedEvents,
        };
      })
    );

    // Return organizers, events, and pagination metadata
    return sendResponse(
      res,
      statusCode.OK,
      true,
      SuccessMessage.ORGANIZERS_FETCH_SUCCESS,
      {
        organizers: organizersWithEvents,
        pagination: organizersResult.pagination,
      }
    );
  } catch (error) {
    console.error("Error fetching organizers and events:", error);
    return sendResponse(
      res,
      statusCode.INTERNAL_SERVER_ERROR,
      false,
      ErrorMessage.INTERNAL_SERVER_ERROR
    );
  }
};


exports.getActiveOrganizers = async (req, res) => {
  try {
    // Fetch only active organizers (status = "active")
    const organizers = await organizersService.findActiveOrganizers();


    if (!organizers || organizers.length === 0) {
      // ✅ success=true, 200, empty data
      return sendResponse(
        res,
        statusCode.OK,
        true,
        SuccessMessage.ACTIVE_ORGANIZERS_FETCH_SUCCESS, // or a neutral "No active organizers"
        []
      );
    }

    // For each active organizer, find the events they are assigned to
    const organizersWithEvents = await Promise.all(organizers.map(async (organizer) => {
      // Fetch events assigned to the current organizer
      const assignedEvents = await eventSchema.find({ organizers: organizer._id });

      // Attach events to the organizer object
      return {
        ...organizer.toObject(),  // Convert mongoose document to plain object
        assignedEvents,           // Add assigned events to the organizer
      };
    }));

    // Return the active organizers along with their assigned events
    return sendResponse(res, statusCode.OK, true, SuccessMessage.ACTIVE_ORGANIZERS_FETCH_SUCCESS, organizersWithEvents);
  } catch (error) {
    console.error('Error fetching active organizers and events:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

// Controller function to assign organizers to an event
exports.assignOrganizers = async (req, res) => {
  try {
    // Event ID from URL
    const { eventId, organizerIds } = req.body;  // Array of organizer IDs from request body

    // Call the service function to assign organizers to the event
    const updatedEvent = await organizersService.assignOrganizers(eventId, organizerIds);

    return sendResponse(res, statusCode.OK, true, SuccessMessage.ORGANIZERS_ASSIGNED, updatedEvent);
  } catch (error) {
    console.error('Error in controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};