require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

const app = express();
const PORT = process.env.PORT;


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

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the backend server! The server is up and running.");
});

app.use("/api/users", authRoutes);
app.use("/api/cars", carRoutes);
