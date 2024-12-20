const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const router = express.Router();

router.post("/", favoriteController.addFavorite);
router.get("/", favoriteController.getFavorites);

module.exports = router;
