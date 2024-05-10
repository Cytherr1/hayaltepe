const express = require("express");
const router = express.Router();
const mailController = require("../../controllers/general_controllers/mail_controller");

router.post("/sendform", mailController.sendMail);

module.exports = router;