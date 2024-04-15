const express = require("express");
const router = express.Router();
const productRoutes = require("../../controllers/admin_controllers/product_controller");

router.get("/getAllProduct", productRoutes.getAllProduct);
router.post("/add", productRoutes.addProduct);
router.post("/delete", productRoutes.removeProduct);
router.post("/update", productRoutes.updateProduct);

module.exports = router;
