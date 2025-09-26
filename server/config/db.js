const mongoose = require("mongoose");


let isConnected = false;

exports.dbConnection = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.DB_URL).then(() => {
            isConnected = true;
            console.log("--- Connected to Mongoose Successfully ---");
        }).catch((err) => {
            console.error("MongoDB connection error:", err);
            throw err;
        });
    } catch (error) {
        console.error("Mongoose connection error:", error);
        throw error;
    }
};


