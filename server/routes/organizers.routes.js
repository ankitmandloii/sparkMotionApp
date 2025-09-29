const express = require('express');
const router = express.Router();
const organizerController = require('../controller/organizers.controller.js');  // Import controller functions// Middleware to verify token
// Middleware to verify token
const organizervalidation = require("../middleware/uservalidation/userValidation.js");


// Create organizer
router.post('/create-organizer',organizervalidation.verifyToken,organizervalidation.checkAdminPermission, organizervalidation.userRegister, organizerController.createOrganizer);

//get Active organizers
router.get('/get-active-organizers-list', organizervalidation.verifyToken, organizervalidation.checkAdminPermission, organizerController.getActiveOrganizers);



// Fetch organizer by ID
router.get('/get-organizer/:id', organizervalidation.verifyToken, organizerController.getOrganizerById);
// Update organizer by ID
router.put('/update-organizer/:id',organizervalidation.verifyToken, organizervalidation.updateOrganizer,organizervalidation.checkAdminPermission, organizerController.updateOrganizer);
// Delete Organizer by ID
router.delete('/delete-organizer/:id',organizervalidation.verifyToken, organizervalidation.deleteOrganizer,organizervalidation.checkAdminPermission, organizerController.deleteOrganizer);
// Fetch all organizers
router.get('/get-organizers-list',organizervalidation.verifyToken,organizervalidation.checkAdminPermission, organizerController.getOrganizers);

// Route to assign organizers to an event
router.put('/assign-organizers',organizervalidation.verifyToken, organizervalidation.checkAdminPermission,organizervalidation.checkAdminPermission, organizerController.assignOrganizers);


module.exports = router;



