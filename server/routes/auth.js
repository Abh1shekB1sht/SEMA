const express = require("express"); // Import express
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library"); // Import Google OAuth2Client
const User = require("../models/User");

const router = express.Router();

// Create an instance of OAuth2Client with your Google Client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register Route (for standard email/password registration)
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User({ name, email, password, role });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route (for standard email/password login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Google Registration/Login Route
router.post("/register-google", async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Your Google Client ID
    });

    const payload = ticket.getPayload();

    // Check if the user already exists
    let user = await User.findOne({ googleId: payload.sub });

    if (!user) {
      // If the user doesn't exist, create a new one
      user = new User({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub, // Save Google ID
        role: "student", // Default role (you can change it as needed)
      });

      await user.save();
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Google login successful",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(400).json({ message: "Google login failed. Please try again." });
  }
});

module.exports = router;
