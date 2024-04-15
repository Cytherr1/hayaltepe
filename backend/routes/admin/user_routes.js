const express = require("express");
const router = express.Router();
const userController = require("../../controllers/admin_controllers/user_controller");

router.post("/add", userController.addUser);
router.post("/delete", userController.deleteUser);
router.post("/update", userController.updateUser);
router.get("/getAllUser", userController.getAllUser);

module.exports = router;