// server.js
require("dotenv").config();
const express = require("express");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!",err);
  });


  app.use(
    cors({
      origin: 'http://localhost:3000', // Allow requests from the frontend
      credentials: true,
    })
  );
app.use(express.json());
const path = require('path');





app.use("/api/users", authRoutes);
app.use("/api/cars", carRoutes);

