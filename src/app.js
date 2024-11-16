// server.js
require("dotenv").config();  // Ensure environment variables are loaded from .env
const express = require("express");
const cors = require("cors");  // Make sure cors is required
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

const app = express();

// Load environment variables
const PORT = process.env.PORT;
const REACT_FRONTEND_API_URL = process.env.REACT_FRONTEND_API_URL;

// Establish database connection
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
  });

// CORS configuration to allow requests from the React frontend
app.use(
  cors({
    origin: REACT_FRONTEND_API_URL,  // Allow requests from the React frontend
    credentials: true,               // If you're sending cookies or authentication headers
  })
);

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use("/api/users", authRoutes);
app.use("/api/cars", carRoutes);
app.get("/", (req, res) => {
res.send("Welcome to the backend server! The server is up and running.");
});

