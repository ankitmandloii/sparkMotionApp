const CFAUsers = require("../model/CFA_Users.js");
exports.addFeedback = async (req, res) => {
    try {
        // Destructure the data from the request body
        const { name, email, organization, position } = req.body;

        // Basic validation to check if all required fields are provided
        if (!name || !email || !organization || !position) {
            return sendResponse()
            return res.status(400).json({ message: "All fields are required." });
        }

        // Optionally, add more specific validation for email format, etc.

        // Check if a user with the same email already exists
        const existingUser = await CFAUsers.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "A user with this email already exists." });
        }

        // Create a new user instance
        const newUser = new CFAUsers({
            name,
            email,
            organization,
            position
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({
            message: "Thank you for signing up!",
            user: newUser
        });

    } catch (err) {
        // Handle any errors that occur during the process
        console.error("Error while adding user:", err);
        res.status(500).json({ message: "An error occurred while signing ." });
    }
};

exports.getFeedbackData = async (req, res) => {
    try {

        // Check if a user with the same email already exists
        const existingUser = await CFAUsers.find({});

        // Send a success response
        res.status(200).json({
            message: "Data fetched successfully",
            data: existingUser
        });

    } catch (err) {
        // Handle any errors that occur during the process
        console.error("Error while fetching user:", err);
        res.status(500).json({ message: "An error occurred while fetching data." });
    }
};
