const Recipe = require("../models/Recipe");
//create a new recipe

exports.createRecipe = async (req, res) => {
  const { title, ingredients, instruction, tags } = req.body;
  console.log(" createRecipe req.body: ", req.body);
  const recipe = new Recipe({
    title,
    ingredients,
    instruction,
    author: req.user.id,
    tags,
  });
  await recipe.save();
  res.status(201).json(recipe);
};

//Get a specific recipe by ID
exports.getRecipe = async (req, res) => {
  console.log("req.params.id: ", req.params.id);

  const recipe = await Recipe.findById(req.params.id).populate(
    "author",
    "username"
  ); // to be studied
  /** it will retrieve the username of the author:
   * {
  "_id": "12345",
  "title": "Chocolate Cake",
  "author": {
    "username": "baker123"
  }
}
   */
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.json(recipe);
};
// Search for recipes based on criteria
exports.searchRecipes = async (req, res) => {
  console.log("---------------------search -------------------");

  const { keyword, ingredients, tags } = req.query;
  console.log("searchRecipes req.query:", req.query);

  const query = {};
  if (keyword) {
    query.title = { $regex: keyword, $options: "i" }; //search case-insensitive.
    console.log("query: ", query);
  }
  if (ingredients) {
    query.ingredients = { $all: ingredients.split(",") }; // If the request query is ?ingredients=tomato,onion,
    // the resulting query will look for recipes that contain both "tomato" and "onion" in their ingredients list
    // (e.g., "Tomato Onion Salad").
  }
  if (tags) {
    query.tags = { $in: tags.split(",") }; //If the request query is ?tags=vegan,quick,
    // the resulting query will look for recipes that have either
    //the "vegan" or "quick" tag (e.g., "Quick Vegan Chili", "Vegan Stir Fry").
  }
  const recipes = await Recipe.find(query).populate("author", "username");
  res.json(recipes);
};

// Rate a recipe
exports.rateRecipe = async (req, res) => {
  const { rating } = req.body;
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  recipe.ratings.push({ user: req.user.id, rating });
  await recipe.save();
  res.json(recipe);
};

// Comment on a recipe
exports.commentOnRecipe = async (req, res) => {
  const { comment } = req.body;
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  recipe.comments.push({ user: req.user.id, comment });
  await recipe.save();
  res.json(recipe);
};
