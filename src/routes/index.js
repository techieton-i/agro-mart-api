const AuthRoute = require("./auth");
const ProductRoute = require('./product');
const OrderRoute = require('./order')

module.exports = (app) => {
    app.use('/api', AuthRoute);
    app.use('/api/product', ProductRoute)
    app.use('/api/order', OrderRoute)
}