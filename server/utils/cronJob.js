const cronjob = require('node-cron');
const eventSchema = require('../model/eventSchema');

exports.createCronJobs = () => {
    
    // Runs every hour at minute 0
    cronjob.schedule('0 * * * *', async () => {
        await this.eventsActiveTOCompletedStatusUpdate(); 
        await this.eventsUpcomingToActiveUpdate();
        console.log("Running cron job for event status updates...");
    });
};

// Update events from Active → Completed
exports.eventsActiveTOCompletedStatusUpdate = async () => {
    try {
        const currentTime = new Date();

        // Find events that should now be marked Completed
        const eventsCompleted = await eventSchema.find({
            eventEndDate: { $lte: currentTime },
            status: "Active"
        });

        if (eventsCompleted.length > 0) {
            await eventSchema.updateMany(
                { _id: { $in: eventsCompleted.map(event => event._id) } },
                { $set: { status: "Completed" } }
            );
            console.log(`✅ ${eventsCompleted.length} event(s) updated to Completed`);
        }
    } catch (error) {
        console.error("❌ Error updating events to Completed:", error);
    }
};

// Update events from Upcoming → Active
exports.eventsUpcomingToActiveUpdate = async () => {
    try {
        const currentTime = new Date();

        // Find events that should now be marked Active
        const eventsToStart = await eventSchema.find({
            eventStartDate: { $lte: currentTime },
            eventEndDate: { $gte: currentTime }, // still ongoing
            status: "Upcoming"
        });

        if (eventsToStart.length > 0) {
            await eventSchema.updateMany(
                { _id: { $in: eventsToStart.map(event => event._id) } },
                { $set: { status: "Active" } }
            );
            console.log(`✅ ${eventsToStart.length} event(s) updated to Active`);
        }
    } catch (error) {
        console.error("❌ Error updating events to Active:", error);
    }
};
