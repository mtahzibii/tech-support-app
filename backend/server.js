// Import modules
const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const dotenv = require("dotenv").config({ path: `${__dirname}/.env` });
const { errorHandler } = require("./middleware/errorMiddleware");

// Connect to database
connectDB();

// set port
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the support desk API" });
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Using error handler
app.use(errorHandler);

// Fire the server
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
