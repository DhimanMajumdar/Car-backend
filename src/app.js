// server.js
require("dotenv").config();
const express = require("express");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

const cors = require("cors");
const path = require("path");

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


app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", authRoutes);
app.use("/api/cars", carRoutes);

