const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instruction: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: { type: [String] },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, red: "User" },
      rating: Number,
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, red: "User" },
      comment: String,
    },
  ],
});

module.exports = mongoose.model("Recipe", recipeSchema);
