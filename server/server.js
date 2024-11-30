const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // Import CORS
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000",  // Allow requests from the frontend (React) server
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
};

app.use(cors(corsOptions));  // Apply CORS middleware with options

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Import routes
const authRoutes = require("./routes/auth");

// Use routes
app.use("/api", authRoutes);  // Apply auth routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
