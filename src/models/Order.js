const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema(
  {
    orderId:String,
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  },
    products: [
      {
        productsId: {
          type:mongoose.Schema.Types.ObjectId,
          ref:'Product'
      },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
