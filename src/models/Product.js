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
    categories: {
      type: Array,
    },
    size: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    Amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", ProductSchema);
