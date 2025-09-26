const cronjob = require('node-cron');
const eventSchema = require('../model/eventSchema');

exports.createCronJobs = () => {
    // Schedule a task to run every hour
    cronjob.schedule('09 15 * * *', async () => {
        await this.eventsStatusUpdate(); // Call your function here
        console.log("Running cron job every hour");
    });
};


exports.eventsStatusUpdate = async () => {
    try {
        const currentTime = new Date();

        const eventsCompleted = await eventSchema.find({
            eventEndDate: { $lte: currentTime },
            status: "Active"
        });
        if (!eventsCompleted.length) return;
        console.log("events---", eventsCompleted)
        await eventSchema.updateMany(
            { _id: { $in: eventsCompleted.map(event => event._id) } },
            { $set: { status: "Completed" } }
        );

    console.log("Event statuses updated based on current time.");
    } catch (error) {
        console.error("Error updating event statuses:", error);
    }
}