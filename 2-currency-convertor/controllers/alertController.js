// controllers/alertController.js
const db = require("../db");
const exchangeService = require("../services/exchangeService");
const nodemailer = require("nodemailer");

// Add a rate alert
exports.setAlert = (req, res) => {
  const { userId, fromCurrency, toCurrency, targetRate } = req.body;

  if (!userId || !fromCurrency || !toCurrency || !targetRate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.run(
    `INSERT INTO alerts (user_id, from_currency, to_currency, target_rate) VALUES (?, ?, ?, ?)`,
    [userId, fromCurrency, toCurrency, targetRate],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error adding alert", error: err.message });
      }
      res
        .status(201)
        .json({ message: "Alert added successfully", alertId: this.lastID });
    }
  );
};

// Get all alerts for a user
exports.getAlerts = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  db.all(`SELECT * FROM alerts WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving alerts", error: err.message });
    }
    res.status(200).json(rows);
  });
};
