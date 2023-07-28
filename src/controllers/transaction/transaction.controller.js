const Order = require("../../models/Order");
const Transaction = require("../../models/Transaction");
const User = require("../../models/User");
const {
  initializePayment,
  HandleOneTimePaymentPaystackWebhook,
} = require("../../utils/paystack");
const TransactionController = {
  async initializePaystackTransaction(req, res) {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "order not found",
      });
    }
    let transaction = await Transaction.create({
      order: order._id,
      user: req.user._id,
      amount: order.amount,
      currency: "NGN",
    });
    const data = {
      email: req.user.email,
      amount: 10000,
      currency: "NGN",
      metadata: {
        transactionId: transaction._id,
        fullName: `${order.user.firstName} ${order.user.lastName}`,
        orderType: "one-time",
      },
    };
    const resp = await initializePayment(data);
    transaction.reference = resp.data.data.reference;
    order.transaction = transaction._id;

    await transaction.save();
    await order.save();

    return res.json({ ...resp.data });
  },

  async PaystackWebhook(req, res) {
    const resp = HandleOneTimePaymentPaystackWebhook(req.body);

    if (resp === null) {
      return res.sendStatus(200);
    }

    return res.sendStatus(200);
  },
  async getTransactions(req, res) {
    const transactions = await Transaction.find({});
    const sumAmount = transactions.reduce((prev, currentItem) => {
      prev + currentItem.amount, 0;
    });
    return res.status(200).json({
      status: "success",
      count: transactions.length,
      total_transaction_amount: sumAmount,
    });
  },
  async getAllTransactions(req, res) {
    const transactions = await Transaction.find();

    // const userInfo = await User.findOne({ _id: product.user });
    // delete userInfo._doc.password;
    // const modifiedTransaction = { ...product._doc, user: userInfo };
    const modifiedTransaction = await Promise.all(
      transactions.map(async (txn) => {
        const userInfo = await User.findOne({ _id: txn.user });
        delete userInfo._doc.password;

        return { ...txn._doc, user: userInfo };
      })
    );
    return res.status(200).json({
      status: "success",
      transactions: modifiedTransaction,
    });
  },
  async getTransaction(req, res) {
    const transaction = await Transaction.findOne({ _id: req.params.id });
    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }
    return res.status(200).json({
      status: "success",
      transaction,
    });
  },
  async updateTransaction(req, res) {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!transaction) {
      return res.status(499).json({
        message: "Transaction not found",
      });
    }
  },
  async getUsersAndTransactions(req, res) {
    const users = await User.find({});
    const transaction = users.map(async (user) => {
      const transactions = await Transaction.find({ user: user._id });
      transactions_length = transactions.length;
      transactions_total_amount = transactions.reduce((prev, currentItem) => {
        prev + currentItem.amount, 0;
      });
      return {
        count: transactions_length,
        total_amount: transactions_total_amount,
        ...user,
      };
    });
    return res.status(200).json({
      status: "success",
      transaction,
    });
  },
};

module.exports = TransactionController;
