const express = require("express");
const router = express.Router();
const logController = require("../../controllers/log_controllers/log_controller");

router.post("/add", logController.addLog);
router.delete("/remove/:id", logController.removeLog);
router.put("/update/:id", logController.updateLog);
router.post("/getLogsFiltered", logController.getLogsFiltered);
router.get("/getAllLogs", logController.getAllLogs);

module.exports = router;
