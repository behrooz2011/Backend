const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  followUser,
  getAllUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect the routes with authentication middleware
router.get("/all", authMiddleware, getAllUsers); // Get user profile
router.get("/profile", authMiddleware, getUserProfile); // Get user profile
router.put("/profile", authMiddleware, updateUserProfile); // Update user profile
router.post("/follow/:userId", authMiddleware, followUser); // Follow another user

module.exports = router;
