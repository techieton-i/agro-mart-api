const Product = require("../../models/Product");
const User = require("../../models/User");
const { validateProductBody } = require("./product.validation");

const ProductController = {
    async rateProduct(req, res){
        const {id} = req.params
        let prod = await Product.findOne({_id:id})
        prod.ratings = req.body.rating
        prod.markModified('ratings')  // Add markModified because ratings is a mixed object type
        prod.save() 
        return res.status(200).json({
            message:'Success fully updated'
        })
    },
  async createProduct(req, res) {
    const { error, value } = validateProductBody(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    const product = await Product.create({ user: req.user._id, ...value });
    return res.status(200).json({
      status: "success",
      product,
    });
  },
  async getProduct(req, res) {
    const product = await Product.findOne({ _id: req.params.productId });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const userInfo = await User.findOne({ _id: product.user });
    const modifiedProduct = { ...product._doc, user: userInfo };

    return res.status(200).json({
      status: "success",
      product: modifiedProduct,
    });
  },
  async getProducts(req, res) {
    const products = await Product.find();
    return res.status(200).json({
      status: "success",
      products,
    });
  },
  async filterProducts(req, res) {
    const products = await Product.find({ category: req.params.category });
    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No product under this category",
      });
    }
    return res.status(200).json({
      status: "success",
      products,
    });
  },
  async updateProduct(req, res) {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { ...req.body }
    );
    if (!product) {
      return res.status(400).json({
        message: "product not found",
      });
    }
    return res.status(200).json({
      message: "Product successfully updated",
    });
  },
  async deleteProduct(req, res) {
    const product = await Product.findOneAndDelete({
      _id: req.params.productId,
    });
    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }
    return res.status(200).json({
      message: "product successfully deleted",
    });
  },
};

module.exports = ProductController;
