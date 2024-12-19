const express = require("express");
const {
  createRecipe,
  getRecipe,
  searchRecipes,
  rateRecipe,
  commentOnRecipe,
  deleteRecipeById,
} = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect the routes with authentication middleware
router.post("/", authMiddleware, createRecipe); // Create a new recipe
router.get("/search", searchRecipes); // Search for recipes
router.delete("/:id", deleteRecipeById); // Get a specific recipe by ID
router.get("/:id", getRecipe); // Get a specific recipe by ID
router.post("/:id/rate", authMiddleware, rateRecipe); // Rate a recipe
router.post("/:id/comments", authMiddleware, commentOnRecipe); // Comment on a recipe

/**
 * Specificity: More specific routes should generally be defined before less specific routes.
 * For example, if you have a route that matches a specific ID (like /:id), it should be defined after any routes
 * that are more specific (like searching or createRecipe). In your case, the routes are defined in a way that
 * does not conflict, but if you had a route like router.get("/:id") defined before router.get("/searching"),
 * it could potentially interfere with requests to /searching.
 */

module.exports = router;
