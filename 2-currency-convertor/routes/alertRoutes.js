const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, alertController.setAlert);
router.get("/", authMiddleware, alertController.getAlerts);

module.exports = router;
