const eventSchema = require('../model/eventSchema'); // Import eventSchema model

// Service function to create an event (Admin only)

exports.createEvent = async (eventDetails, createdBy) => {
  try {
    // Destructure the eventDetails to get the necessary fields
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
    } = eventDetails;

  
    // Create a new event object
    const newEvent = new eventSchema({
      eventName,
      eventStartDate,
      eventEndDate,
      utmParams, 
      expectedAttendees, 
      location, 
      baseUrl,
      createdBy,
      status: 'Upcoming',  // The event will start as "Upcoming"
      destinationUrl,
      clickCount: 0,  // Start the click count at 0
      organizers: organizerIds || []  // Assign organizers if provided, else an empty array
    });

    // Save the event to the database
    await newEvent.save();

    const utm_sourceData = newEvent?.utmParams?.utm_source || "NA";
    const utm_mediumData = newEvent?.utmParams?.utm_medium || "NA";
    const utm_campaignData = newEvent?.utmParams?.utm_campaign || "NA";
    const utm_termData = newEvent?.utmParams?.utm_term || "NA";
    const utm_contentData = newEvent?.utmParams?.utm_content || "NA";

   
   const eventId = newEvent._id;
   console.log("New Event ID:", eventId, "Base URL:", baseUrl + eventId); // Debugging line to check the new event ID
   const fullUrlForHit = baseUrl + eventId + `?utm_source=${utm_sourceData}&utm_medium=${utm_mediumData}&utm_campaign=${utm_campaignData}&utm_term=${utm_termData}&utm_content=${utm_contentData}`;
   const UpdatedData = await eventSchema.findByIdAndUpdate(eventId, { baseUrl: fullUrlForHit }, { new: true }).populate('organizers');
  
    return UpdatedData;  // Return the created event
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;  // Propagate the error to the controller
  }
};


// Service function to assign organizers to an event
exports.assignOrganizers = async (eventId, organizerIds) => {
  try {
    // Ensure the provided organizerIds exist in the database
    const organizers = await User.find({ '_id': { $in: organizerIds } });

    if (organizers.length !== organizerIds.length) {
      throw new Error('One or more organizer IDs are invalid');
    }

    // Find the event by eventId
    const event = await eventSchema.findById(eventId);

    if (!event) {
      throw new Error('eventSchema not found');
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


// Service function to assign organizers to an event
exports.assignOrganizers = async (eventId, organizerIds) => {
  try {
    // Ensure the provided organizerIds exist in the database
    const organizers = await User.find({ '_id': { $in: organizerIds } });

    if (organizers.length !== organizerIds.length) {
      throw new Error('One or more organizer IDs are invalid');
    }

    // Find the event by eventId
    const event = await eventSchema.findById(eventId);

    if (!event) {
      throw new Error('eventSchema not found');
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
// Service function to update an event by eventId (Admin only)
// services/eventService.js
exports.updateEvent = async (eventId, eventDetails) => {
  try {
    // Update event with all provided details
    const updatedEvent = await eventSchema.findByIdAndUpdate(
      eventId,
      { $set: eventDetails },   // Update everything passed in body
      { new: true, runValidators: true }  // Return updated doc + run schema validators
    ).populate('organizers'); // Populate organizers with selected fields

   
    if (!updatedEvent) {
      throw new Error('Event not found');
    }

    return updatedEvent;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Service function to get all events created by an organizer
exports.getMyEvents = async (createdBy, page, limit) => {
  try {
    const events = await eventSchema.find({ createdBy })
      .populate('organizers', 'userName email phoneNumber status') // Populate organizers with selected fields
      .skip((page - 1) * limit)
      .limit(limit);
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

exports.getEventsByOrganizerId = async (organizerId) => {
  try {
    // Find all events where the organizer is the creator
    const events = await eventSchema.find({ organizers: { $in: [organizerId] } });
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Service function to get a specific event by its ID
exports.getEventById = async (eventId) => {
  try {
    const event = await eventSchema.findById(eventId).populate('organizers', 'userName email');
    if (!event) {
      throw new Error('eventSchema not found');
    }
    return event;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

// Service function to delete an event by its ID (Admin only)
exports.deleteEvent = async (eventId) => {
  try {
    const event = await eventSchema.findByIdAndDelete(eventId);
    if (!event) {
      throw new Error('eventSchema not found');
    }
    return event;  // Return the deleted event
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Service function to update the destination URL for an event (Organizer only)
exports.updateDestinationUrl = async (eventId, destinationUrl, userId) => {
  try {
    const event = await eventSchema.findById(eventId);

    if (!event) {
      throw new Error('eventSchema not found');
    }

    // Check if the user is part of the event's organizers
    if (!event.organizers.includes(userId) && event.createdBy.toString() !== userId) {
      throw new Error('User not authorized to update destination URL');
    }

    event.destinationUrl = destinationUrl;
    await event.save();

    return event;
  } catch (error) {
    console.error('Error updating destination URL:', error);
    throw error;
  }
};
