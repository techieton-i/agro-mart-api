const Product = require('../../models/Product');
const {validateProductBody} = require('./product.validation');

const ProductController = {
    async createProduct(req, res){
        const { error, value} = validateProductBody(req.body)
        if(error){
            return res.status(400).json(error)
        }
        const product = await Product.create({user:req.user._id, ...value})
        return res.status(200).json({
            status:'success',
            product
        })
    },
    async getProduct(req, res){
        const product = await Product.findOne({_id:req.params.productId})
        if(!product){
            return res.status(404).json({
                message:'Product not found'
            })
        }
        return res.status(200).json({
            status:'success',
            product
        })
    },
    async getProducts(req, res){
        console.log('hi')
        const products = await Product.find()
        console.log(products, 'here')
        return res.status(200).json({
            status:'success',
            products
        })
    },
    async filterProducts(req, res){
        const products = await Product.find({category:req.params.category})
        if(!products || products.length === 0){
            return res.status(404).json({
                message:'No product under this category'
            })
        }
        return res.status(200).json({
            status:'success',
            products
        })
    },
    async updateProduct(req, res){
        const product = await Product.findOneAndUpdate({_id:req.params.productId},{...req.body})
        if(!product){
            return res.status(400).json({
                message:'product not found'
            })
        }
        return res.status(200).json({
            message:'Product successfully updated'
        })
    },
    async deleteProduct(req, res){
        const product = await Product.findOneAndDelete({_id:req.params.productId})
        if(!product){
            return res.status(404).json({
                message:'product not found'
            })
        }
        return res.status(200).json({
            message:'product successfully deleted'
        })
    }
}

module.exports = ProductController