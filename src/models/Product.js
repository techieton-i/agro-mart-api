const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
    },
    category:{
      type:String
    },
    size: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
