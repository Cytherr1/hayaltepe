const express = require("express");
const router = express.Router();
const productController = require("../../controllers/general_controllers/product_controller");

router.get("/all", productController.getAllProduct);

module.exports = router;