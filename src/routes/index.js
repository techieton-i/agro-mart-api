const AuthRoute = require("./auth");
const ProductRoute = require('./product');
const OrderRoute = require('./order')
const TransactionRoute = require('./transaction')
const SellerRoute = require('./seller')


module.exports = (app) => {
    app.use('/api', AuthRoute);
    app.use('/api/product', ProductRoute)
    app.use('/api/order', OrderRoute)
    app.use('/api/transaction', TransactionRoute)
    app.use('/api/seller', SellerRoute)
}