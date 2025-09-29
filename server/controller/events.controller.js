const eventService = require('../services/events.service');  // Import the event service
const { sendResponse } = require('../utils/sendResponse.js');
const { statusCode } = require('../constant/statusCodes.js');
const { ErrorMessage, SuccessMessage } = require('../constant/messages.js');

// Controller function to create an event (Admin only)

// Controller function to create an event (Admin only)
exports.createEvent = async (req, res) => {
  try {
    const { 
      eventName, 
      eventStartDate, 
      eventEndDate, 
      utmParams, 
      expectedAttendees, 
      location, 
      baseUrl, 
      destinationUrl,
      organizerIds 
      } = req.body;

    const createdBy = req.user._id;  // Get the ID of the user creating the event (Admin)

    // Call the service to create the event
    const newEvent = await eventService.createEvent({
      eventName,
      eventStartDate,
      eventEndDate,
      utmParams,
      expectedAttendees,
      location,
      baseUrl,
      destinationUrl,
      organizerIds
    }, createdBy);

    // If the event was created successfully, return a success response
    if (!newEvent) {
      return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.EVENT_CREATION_FAILED);
    }
   
   


    return sendResponse(res, statusCode.OK, true, SuccessMessage.EVENT_CREATED, newEvent);
  } catch (error) {
    console.error('Error in controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

// Controller function to update an event (Admin only)
// controllers/eventController.js
exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Full event details from request body
    const {
      eventName,
      eventStartDate,
      eventEndDate,
      utmParams,
      expectedAttendees,
      location,
      destinationUrl,
      status,
      organizers
    } = req.body;

    // Call the service with all event fields
    const updatedEvent = await eventService.updateEvent(eventId, {
      eventName,
      eventStartDate,
      eventEndDate,
      utmParams,
      expectedAttendees,
      location,
      destinationUrl,
      status,
      organizers
    });

    return sendResponse(res, statusCode.OK, true, SuccessMessage.EVENT_UPDATED, updatedEvent);
  } catch (error) {
    console.error('Error in updateEvent controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, error.message || ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};


// Controller function to get all events created by an organizer
exports.getMyEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const createdBy = req.user._id;  // Assuming req.user contains the logged-in organizer
  
    // Call the service to get events for the organizer
    const events = await eventService.getMyEvents(createdBy, page, limit);

    return sendResponse(res, statusCode.OK, true, SuccessMessage.EVENTS_FETCHED, events);
  } catch (error) {
    console.error('Error in controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

exports.getEventsByOrganizerId = async (req, res) => {
  try {
    const { organizerId } = req.params;
    console.log("Organizer ID:", organizerId); // Debugging line to check the organizer ID
    // Call the service to get events for the organizer
    const events = await eventService.getEventsByOrganizerId(organizerId);

    return sendResponse(res, statusCode.OK, true, SuccessMessage.EVENTS_FETCHED, events);
  } catch (error) {
    console.error('Error in controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

// Controller function to get a specific event by eventId (Admin can view all events, Organizer can view their own events)
exports.getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Call the service to get the event by its ID
    const event = await eventService.getEventById(eventId);

    return sendResponse(res, statusCode.OK, true, SuccessMessage.EVENT_FETCHED, event);
  } catch (error) {
    console.error('Error in controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

// Controller function to delete an event by eventId (Admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Call the service to delete the event by its ID
    const event = await eventService.deleteEvent(eventId);

    return sendResponse(res, statusCode.OK, true, SuccessMessage.EVENT_DELETED, event);
  } catch (error) {
    console.error('Error in controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

// Controller function to update the destination URL for an event (Organizer only)
exports.updateDestinationUrl = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { destinationUrl } = req.body;
    const userId = req.user._id;

    // Call the service to update the destination URL
    const updatedEvent = await eventService.updateDestinationUrl(
      eventId,
      destinationUrl,
      userId
    );

    return sendResponse(res, statusCode.OK, true, SuccessMessage.DESTINATION_URL_UPDATED, updatedEvent);
  } catch (error) {
    console.error('Error in controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
