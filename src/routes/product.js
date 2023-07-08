const router = require("express").Router();
const ProductController = require('../controllers/products/products.controller')
const asyncHandler = require("../utils/AsyncHandler");
const auth = require('../utils/Authorization')



router.post('/create', auth, asyncHandler(ProductController.createProduct))
router.get('/:productId', auth, asyncHandler(ProductController.getProduct))
router.get('/new', auth, asyncHandler(ProductController.getProducts))
router.get('/', auth, asyncHandler(ProductController.getSellerProducts))
router.patch('/:productId', auth, asyncHandler(ProductController.updateProduct))
router.delete('/:productId', auth, asyncHandler(ProductController.deleteProduct))
router.get('/filter/:category', auth, asyncHandler(ProductController.filterProducts))

module.exports = router;
