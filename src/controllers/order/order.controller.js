const Order = require('../../models/Order')
const {getUniqueId} = require('../../utils/index');


const OrderController = {
    async createOrder(req, res){
        const orderId = await getUniqueId()
        const body = {...req.body, orderId, user:req.user._id}
        const order = await Order.create(body)
        return res.status(200).json({
            status: 'success',
            order
        })
    },
    async getOrder(req, res){
        const order = await Order.findOne({orderId:req.params.orderId})
        if(!order){
            return res.status(400).json({
                message:'order not found'
            })
        }
        return  res.status(200).json({
            status:'success',
            order
        })
    },
    async getOrders(req, res){
        const orders = await Order.find({user:req.user._id})
        return res.status(200).json({
            status:'success',
            orders
        })
    },
    async updateOrder(req, res){
        const order = await Order.findOneAndUpdate({orderId:req.params.orderId},{...req.body})
        if(!order){
            return res.status(400).json({
                message:'order not found'
            })
        }
        return res.status(200).json({
            message:'order updated successfully'
        })
    },
    async deleteOrder(req, res){
        const order = await Order.findOneAndDelete({orderId:req.params.orderId})
        return res.status(200).json({
            message:'Order successfully deleted'
        })
    }
}

module.exports = OrderController