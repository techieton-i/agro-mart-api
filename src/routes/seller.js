const router = require("express").Router();
const SellerController = require('../controllers/products/seller.controller')
const asyncHandler = require("../utils/AsyncHandler");
const auth = require('../utils/Authorization')
const RoleGuard = require("../utils/RoleGuard");


router.get('/product', [auth, RoleGuard(["farmer"])], asyncHandler(SellerController.getSellerProducts))

module.exports = router