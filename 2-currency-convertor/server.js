// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Import routes and services
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const alertRoutes = require("./routes/alertRoutes");
const exchangeService = require("./services/exchangeService");
const cronJobs = require("./cron/cronJobs");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/alerts", alertRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Currency Converter API running on http://localhost:${port}`);
  // Start scheduled tasks
  cronJobs.startRateAlertChecker();
});
