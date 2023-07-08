const router = require("express").Router();
const OrderController = require('../controllers/order/order.controller');
const Order = require("../models/Order");
const asyncHandler = require("../utils/AsyncHandler");
const auth = require('../utils/Authorization')


router.post('/create', auth, asyncHandler(OrderController.createOrder))
router.get('/:orderId', auth, asyncHandler(OrderController.getOrder))
router.get('/', auth, asyncHandler(OrderController.getOrders))
router.patch('/:orderId', auth, asyncHandler(OrderController.updateOrder))
router.delete('/:orderId', auth, asyncHandler(OrderController.deleteOrder))

module.exports = router;
