const AuthRoute = require("./auth");

module.exports = (app) => {
    app.use('/api', AuthRoute);
}