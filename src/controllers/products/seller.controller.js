const Product = require('../../models/Product');
const SellerController = {
    async getSellerProducts(req, res){
        const products = await Product.find({user:req.user._id})
        return res.status(200).json({
            status:'success',
            products
        })
    },
}
module.exports = SellerController