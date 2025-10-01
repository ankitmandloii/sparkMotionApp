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
//last code 
// exports.updateEvent = async (req, res) => {
//   try {
//     const { eventId } = req.params;

//     // Full event details from request body
//     const {
//       eventName,
//       eventStartDate,
//       eventEndDate,
//       utmParams,
//       expectedAttendees,
//       location,
//       destinationUrl,
//       status,
//       organizerIds
//     } = req.body;

//     // Call the service with all event fields
//     const updatedEvent = await eventService.updateEvent(eventId, {
//       eventName,
//       eventStartDate,
//       eventEndDate,
//       utmParams,
//       expectedAttendees,
//       location,
//       destinationUrl,
//       status,
//       organizers: organizerIds
//     });

//     return sendResponse(res, statusCode.OK, true, SuccessMessage.EVENT_UPDATED, updatedEvent);
//   } catch (error) {
//     console.error('Error in updateEvent controller:', error);
//     return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, error.message || ErrorMessage.INTERNAL_SERVER_ERROR);
//   }
// };

exports.updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const {
      eventName,
      eventStartDate,
      eventEndDate,
      utmParams,
      expectedAttendees,
      location,
      destinationUrl,
      status,       // requested status from admin
      organizerIds
    } = req.body;

    // Validate status logic
    // const now = new Date();
    // let correctStatus;

    // if (eventStartDate && eventEndDate) {
    //   if (now < new Date(eventStartDate)) {
    //     correctStatus = "Upcoming";
    //   } else if (now >= new Date(eventStartDate) && now <= new Date(eventEndDate)) {
    //     correctStatus = "Active";
    //   } else if (now > new Date(eventEndDate)) {
    //     correctStatus = "Completed";
    //   }
    // }

    // // If requested status doesn’t match the actual logic → reject
    // if (status && status !== correctStatus) {
    //   return sendResponse(
    //     res,
    //     statusCode.BAD_REQUEST,
    //     false,
    //     `Invalid status update. Event should be "${correctStatus}" based on dates.`
    //   );
    // }

    // Call service for update
    const updatedEvent = await eventService.updateEvent(eventId, {
      eventName,
      eventStartDate,
      eventEndDate,
      utmParams,
      expectedAttendees,
      location,
      destinationUrl,
      status,  // will be same as correctStatus
      organizers: organizerIds
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
    const { page = 1, limit = 10 ,searchQuery} = req.query;
    const createdBy = req.user._id;  // Assuming req.user contains the logged-in organizer

    // Call the service to get events for the organizer
    const events = await eventService.getMyEvents(createdBy, page, limit,searchQuery);

    return sendResponse(res, statusCode.OK, true, SuccessMessage.EVENTS_FETCHED, events);
  } catch (error) {
    console.error('Error in controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

exports.getAllRecentEvents = async (req, res) => {
  try {
    const { searchQuery} = req.query;
    const createdBy = req.user._id;  // Assuming req.user contains the logged-in organizer

    // Call the service to get events for the organizer
    const events = await eventService.getAllRecentEvents(createdBy, searchQuery);
    
    if (!events || events.length === 0) {
      return sendResponse(res, statusCode.OK, false, ErrorMessage.NO_EVENTS_FOUND, []);
    }
    
    const data = {
      totalTabs: events.map(event => event.clickCount).reduce((acc, count) => acc + count, 0),
      totalAttendees: events.reduce((sum, event) => sum + (event.expectedAttendees || 0), 0),
      totalEventsCount: events.length,
      recentEvents: events.slice(0, 3) // Get the 5 most recent events
    };
    return sendResponse(res, statusCode.OK, true, SuccessMessage.EVENTS_FETCHED, data);
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
    const { destinationUrl, expectedAttendees } = req.body;


    // Call the service to update the destination URL
    const updatedEvent = await eventService.updateDestinationUrl(
      eventId,
      destinationUrl,
      expectedAttendees,
    );

    return sendResponse(res, statusCode.OK, true, SuccessMessage.DESTINATION_URL_UPDATED, updatedEvent);
  } catch (error) {
    console.error('Error in controller:', error);
    return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, error.message || ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
