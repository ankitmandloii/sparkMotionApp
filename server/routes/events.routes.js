const express = require('express');
const router = express.Router();
const eventController = require('../controller/events.controller');  // Import controller functions// Middleware to verify token
// Middleware to verify token
const eventsvalidation = require("../middleware/uservalidation/userValidation.js");
const {createEventValidationData, updateEventValidationData} = require("../middleware/eventsValidation/eventsValidation.js");

// Route to create an event (Admin only)
router.post('/create-event',eventsvalidation.verifyToken, eventsvalidation.checkAdminPermission, createEventValidationData, eventController.createEvent);

// Route to update an event by eventId (Admin only)
router.put('/update-event/:eventId',eventsvalidation.verifyToken, eventsvalidation.checkAdminPermission,updateEventValidationData, eventController.updateEvent);

// Route to get all events for an organizer //eventsvalidation.checkOrganizerPermission
router.get('/get-all-events', eventsvalidation.verifyToken,eventsvalidation.checkAdminPermission, eventController.getMyEvents);

router.get('/get-organizer-events/:organizerId', eventsvalidation.verifyToken, eventsvalidation.checkOrganizerPermission, eventController.getEventsByOrganizerId);

// Route to get event by eventId (Admin can view all events, Organizer can view their own events)
router.get('/get-eventsById/:eventId', eventsvalidation.verifyToken, eventsvalidation.checkEventViewPermission, eventController.getEventById);

// Route to delete an event by eventId (Admin only)
router.delete('/delete-event/:eventId',eventsvalidation.verifyToken, eventsvalidation.checkAdminPermission, eventController.deleteEvent);

// Route to update destination URL for organizers (Event Organizer only) //eventsvalidation.checkOrganizerPermission
router.put('/update-destination-url/:eventId',eventsvalidation.verifyToken,  eventController.updateDestinationUrl);

module.exports = router;



