const express = require("express");
const { practiceController } = require("../controllers/practiceController");
// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect the routes with authentication middleware
router.get("/", practiceController); // Get user profile

module.exports = router;
