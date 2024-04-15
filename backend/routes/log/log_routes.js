const express = require("express");
const router = express.Router();
const logController = require("../../controllers/log_controllers/log_controller");

router.post("/add", logController.addLog);
router.get("/getAllLogs", logController.getAllLogs);

module.exports = router;
