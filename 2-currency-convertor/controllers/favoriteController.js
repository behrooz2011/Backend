const db = require("../db");

// Add a favorite currency pair
exports.addFavorite = (req, res) => {
  console.log(" --addFavorite--");
  const userId = req.user.id;

  const { fromCurrency, toCurrency } = req.body;

  if (!userId || !fromCurrency || !toCurrency) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log({ userId, fromCurrency, toCurrency });

  db.run(
    `INSERT INTO favorites (user_id, from_currency, to_currency) VALUES (?, ?, ?)`,
    [userId, fromCurrency, toCurrency],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error adding favorite", error: err.message });
      }
      res.status(201).json({
        message: "Favorite added successfully",
        favoriteId: this.lastID,
      });
    }
  );
};

// Get all favorites for a user
exports.getFavorites = (req, res) => {
  // const { userId } = req.params;
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  db.all(`SELECT * FROM favorites WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving favorites", error: err.message });
    }
    res.status(200).json(rows);
  });
};
