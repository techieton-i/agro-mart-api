const router = require("express").Router();
const OrderController = require('../controllers/order/order.controller');
const asyncHandler = require("../utils/AsyncHandler");
const auth = require('../utils/Authorization')
const RoleGuard = require("../utils/RoleGuard");


router.post('/create', auth, asyncHandler(OrderController.createOrder))
router.get('/:orderId', auth, asyncHandler(OrderController.getOrder))
router.get('/', auth, asyncHandler(OrderController.getOrders))
router.patch('/:orderId', auth, asyncHandler(OrderController.updateOrder))
router.delete('/:orderId', auth, asyncHandler(OrderController.deleteOrder))

module.exports = router;
