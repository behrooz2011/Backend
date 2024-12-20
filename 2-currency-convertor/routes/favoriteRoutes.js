const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/", authMiddleware, favoriteController.addFavorite);
router.get("/", authMiddleware, favoriteController.getFavorites);

module.exports = router;
