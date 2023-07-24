const router = require("express").Router();
const ProductController = require('../controllers/products/products.controller')
const asyncHandler = require("../utils/AsyncHandler");
const auth = require('../utils/Authorization')
const RoleGuard = require("../utils/RoleGuard");


router.post('/create', [auth, RoleGuard(['admin', 'farmer'])], asyncHandler(ProductController.createProduct))
router.get('/:productId', auth, asyncHandler(ProductController.getProduct))
router.get('/', auth, asyncHandler(ProductController.getProducts))
router.patch('/:productId', [auth, RoleGuard(['admin', 'farmer'])], asyncHandler(ProductController.updateProduct))
router.delete('/:productId', [auth, RoleGuard(['admin', 'farmer'])], asyncHandler(ProductController.deleteProduct))
router.get('/filter/:category', auth, asyncHandler(ProductController.filterProducts))

module.exports = router;
