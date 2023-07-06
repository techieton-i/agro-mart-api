const { rawListeners } = require("../models/User");
const { verifyToken } = require("./verifyToken");

const router = require("express").Router();

router.put("/:id", verifyToken, (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
  }
});

module.exports = router;
