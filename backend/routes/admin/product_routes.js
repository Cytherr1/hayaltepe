const express = require("express");
const router = express.Router();
const productRoutes = require("../../controllers/admin_controllers/product_controller");
const upload = require("../../middlewares/multerMiddleware");

router.get("/getAllProduct", productRoutes.getAllProduct);
router.post("/add", upload.single("image"), productRoutes.addProduct);
router.post("/delete", productRoutes.removeProduct);
router.post("/update", upload.single("image"), productRoutes.updateProduct);

module.exports = router;
