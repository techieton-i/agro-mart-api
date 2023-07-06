const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        productsId: { type: String, required: true, unique: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    // amount: {
    //   type: Number,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", CartSchema);
