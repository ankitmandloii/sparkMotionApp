const User = require("../model/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const emailConfig = require('../config/email.js');
const emailTemplates = require("../utils/emailTemplate.js");
const nodemailer = require('nodemailer');







exports.signUp = async (userName, email, phoneNumber, password, role, status) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      status
    };

    const userCreated = await User.create(newUser);
    return userCreated;
  } catch (error) {
    //console.error('Error creating user:', error);
    return false;
  }
};







exports.findUserForLogin = async (email) => {
  try {
    const user = await User.findOne({ email }).lean(); // lean() returns plain JS object, faster if no methods needed
    return user || null;
  } catch (error) {
    console.error("Find User Error:", error);
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
    );
    return updatedOrganizer;
  } catch (error) {
    console.error("Update Organizer Error:", error);
    return false;
  }
};

// Service for deleting organizer by ID
exports.deleteOrganizerById = async (id) => {
  try {
    const deletedOrganizer = await User.findByIdAndDelete(id);
    return deletedOrganizer;
  } catch (error) {
    console.error("Delete Organizer Error:", error);
    return false;
  }
};


exports.passwordCompareForLogin = async (user, password) => {
  try {
    

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return false;

    // Generate JWT
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role }, // Payload
      SECRET_KEY,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // Return user info + token
    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.userName,
        role: user.role,
        status: user.status
      },
      token,
    };

  } catch (error) {
    console.error('Login error:', error);
    throw error; 
  }
};


exports.incrementTokenVersion = async (userId) => {
  const user = await User.findById(userId); // or Sequelize equivalent
  user.tokenVersion += 1;
  await user.save();
};



// Service for fetching all organizers
exports.findAllOrganizers = async () => {
  try {
    const organizers = await User.find({ role: "organizer" });
    return organizers;
  } catch (error) {
    console.error("Error fetching organizers:", error);
    throw error;
  }
};

// Service for fetching organizer by ID
exports.findOrganizerById = async (id) => {
  try {
    const organizer = await User.findById(id);
    return organizer || null;
  } catch (error) {
    console.error("Find Organizer By ID Error:", error);
    throw error;
  }
};



