// Import modules
const path = require("path");
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
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" });
  });
}

// Using error handler
app.use(errorHandler);

// Fire the server
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
