const router = require("express").Router();
const ProductController = require("../controllers/products/products.controller");
const asyncHandler = require("../utils/AsyncHandler");
const auth = require("../utils/Authorization");
const RoleGuard = require("../utils/RoleGuard");

router.post(
  "/create",
  [auth, RoleGuard(["admin", "farmer"])],
  asyncHandler(ProductController.createProduct)
);
router.get("/:productId", asyncHandler(ProductController.getProduct));
router.get("/", asyncHandler(ProductController.getProducts));
router.patch(
  "/:productId",
  [auth, RoleGuard(["admin", "farmer"])],
  asyncHandler(ProductController.updateProduct)
);
router.delete(
  "/:productId",
  [auth, RoleGuard(["admin", "farmer"])],
  asyncHandler(ProductController.deleteProduct)
);
router.get("/filter/:category", asyncHandler(ProductController.filterProducts));
router.patch("/rate/:id", auth, asyncHandler(ProductController.rateProduct));

module.exports = router;
