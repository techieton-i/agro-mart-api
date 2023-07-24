const dotenv = require('dotenv').config();
const axios = require('axios');
// const { paystackSecretKey, paystackTestSecretKey } = require('../config');
const Transaction = require('../models/Transaction') 
const Order = require('../models/Order')

const config = {
  headers: {
    Authorization: `Bearer ${process.env.paystackSecretKey}`,
    Content_Type: 'application/json',
  },
};

const Paystack = {
  async initializePayment(data) {
    const url = 'https://api.paystack.co/transaction/initialize';

    const resp = await axios.post(url, data, config);

    return resp;
  },
  async HandleOneTimePaymentPaystackWebhook(body) {
    const metadata = body.data.metadata;

    const transaction = await Transaction.findOne(metadata.transactionId);

    if (!transaction) {
      return null;
    }

    const order = await Order.findOne({_id:transaction.order});

    order.isPaid = true;

    await order.save();
    await Transaction.updateOne({ _id: transaction._id }, { status: 'success' });

    return order;
  },
};

module.exports = Paystack;
