const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is invalid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("not authenticated");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    }
    res.status(403).json("You are not allowed to perform this task");
  });
};

module.exports = { verifyToken };