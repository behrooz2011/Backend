const express = require("express");
const {
  createRecipe,
  getRecipe,
  searchRecipes,
  rateRecipe,
  commentOnRecipe,
} = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect the routes with authentication middleware
router.post("/", authMiddleware, createRecipe); // Create a new recipe
router.get("/:id", getRecipe); // Get a specific recipe by ID
router.get("/search", searchRecipes); // Search for recipes
router.post("/:id/rate", authMiddleware, rateRecipe); // Rate a recipe
router.post("/:id/comments", authMiddleware, commentOnRecipe); // Comment on a recipe

module.exports = router;
