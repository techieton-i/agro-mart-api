const { Router } = require("express");
const auth = require("../utils/Authorization");
const asyncHandler = require("../utils/AsyncHandler");
const TransactionController = require("../controllers/transaction/transaction.controller");
const router = Router();

router.post(
  "/paystack/intialize/:orderId",
  auth,
  asyncHandler(TransactionController.initializePaystackTransaction)
);

router.post(
  "/paystack/webhook",
  asyncHandler(TransactionController.PaystackWebhook)
);
router.get("/", auth, asyncHandler(TransactionController.getAllTransactions));

module.exports = router;
