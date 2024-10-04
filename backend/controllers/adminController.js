const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// Admin registration
const registerAdmin = async (req, res) => {
  const { name, email, password, secretPassword } = req.body;

  // Check if the secret password matches the one in .env
  if (secretPassword !== process.env.ADMIN_SECRET_PASSWORD) {
    res.status(401);
    throw new Error("Unauthorized: Incorrect secret password");
  }

  // Check if admin already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  // Create a new admin user
  const user = await User.create({
    name,
    email,
    password,
    isAdmin: true, // Ensure the user is created as an admin
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// Admin login
const authAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists, is an admin, and if the password matches
    if (user && user.isAdmin && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // Return 401 status for invalid credentials
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // Return 500 status for server-side errors and log the error
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerAdmin, authAdmin };
