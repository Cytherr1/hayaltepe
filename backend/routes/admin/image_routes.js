const express = require("express");
const router = express.Router();
const imageController = require("../../controllers/admin_controllers/image_controller.js");

router.post("/upload", imageController.uploadImage);
router.get("/display", imageController.displayImage);

module.exports = router;