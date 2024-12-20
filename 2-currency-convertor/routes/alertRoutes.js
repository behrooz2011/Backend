const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController");

router.post("/", alertController.setAlert);
router.get("/", alertController.getAlerts);

module.exports = router;
