const nodemailer = require('nodemailer');
const emailTemplates = require('../utils/emailTemplate.js');
const emailConfig = require('../config/email.js');
const User = require('../model/userSchema.js');
const Event = require('../model/eventSchema.js');  // Import the Event model



// Function to send a welcome email

exports.sendWelcomeOrganizerEmail = async (details) => {
  try {
    const transporter = nodemailer.createTransport(emailConfig);

    let mailOptions = emailTemplates.sendWelcomeOrganizerEmail(details);

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent for Verification OTP: ${info.response}`);
    return true;
  }
  catch (e) {
    console.error(
      `Error in email send For OTP: ${e}`,
    );
    return false;
  }
}


// Service for fetching organizer by ID
exports.findOrganizerById = async (id) => {
  try {
    const user = await User.findById(id).select('-password'); // Exclude password field
    return user || null;
  } catch (error) {
    console.error("Find Organizer By ID Error:", error);
    throw error;
  }
};


// Service for updating organizer by ID
exports.updateOrganizerById = async (id, userName, email, phoneNumber, role, status) => {
  try {
    const updatedOrganizer = await User.findByIdAndUpdate(
      id,
      { userName, email, phoneNumber, role, status },
      { new: true }  // Return the updated organizer document
    ).select('-password'); // Exclude password field
    return updatedOrganizer;
  } catch (error) {
    console.error("Update Organizer Error:", error);
    return false;
  }
};


// Service for deleting organizer by ID
exports.deleteOrganizerById = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id).select('-password'); // Exclude password field
    return deletedUser;
  } catch (error) {
    console.error("Delete User Error:", error);
    return false;
  }
};

// Service for fetching all organizers
exports.findAllOrganizers = async (page, limit) => {
  try {
    page = parseInt(page);
    limit = parseInt(limit);

   
    const skip = (page - 1) * limit;


    const organizers = await User.find({ role: "organizer" }).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit);
  
    // Count total organizers (for frontend pagination info)
    const total = await User.countDocuments({ role: "organizer" });
    return {
      data: organizers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching organizers:", error);
    throw error;
  }
};

exports.findActiveOrganizers = async () => {
  try {
    // Fetch only active organizers (status = "active")
    const organizers = await User.find({ role: "organizer", status: "active" }).select('-password');

    return organizers;
  } catch (error) {
    console.error("Error fetching active organizers:", error);
    throw error;  // Propagate the error
  }
};

// Service function to assign organizers to an event
exports.assignOrganizers = async (eventId, organizerIds) => {
  try {
    console.log("Assigning Organizers:", { eventId, organizerIds }); // Debugging line to check inputs
    // Ensure the provided organizerIds exist in the database
    const organizers = await User.find({ '_id': { $in: organizerIds } });

    console.log("Found Organizers:", organizers); // Debugging line to check found organizers
    if (organizers.length !== organizerIds.length) {
      throw new Error('One or more organizer IDs are invalid');
    }

    // Find the event by eventId
    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error('Event not found');
    }
    // Prevent duplicate assignments
    const currentOrganizers = event.organizers.map(org => org.toString()); // Convert objectIds to strings
    const newOrganizers = organizerIds.filter(orgId => !currentOrganizers.includes(orgId.toString()));

    if (newOrganizers.length === 0) {
      throw new Error('All organizers are already assigned to this event');
    }
    // Add organizers to the event's organizer list
    event.organizers.push(...organizerIds);  // Add the organizer IDs to the event's organizers array

    // Save the event with the new organizers
    await event.save();

    return event;  // Return the updated event
  } catch (error) {
    console.error('Error assigning organizers:', error);
    throw error;  // Propagate the error to the controller
  }
};
