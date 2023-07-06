const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
// router.post("/register", async (req, res) => {
//   console.log(process.env.PASS_SEC);
//   console.log(req.body);

//   try {
//     const savedUser = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: CryptoJS.AES.encrypt(
//         req.body.password,
//         process.env.PASS_SEC
//       ).toString(),
//     });
//     console.log(savedUser);
//     res.status(200).send(savedUser);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await user.save();
    console.log(savedUser);
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username } = req.body;
  try {
    const existingUser = await User.findOne({ username: username });
    if (!existingUser)
      res.status(401).send({
        status: false,
        message: `user with username ${username} not found`,
      });

    const decodedPassword = CryptoJS.AES.decrypt(
      existingUser.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (req.body.password !== decodedPassword) {
      return res
        .status(401)
        .send({ status: false, message: "Invalid Username or Password" });
    }

    const accessToken = jwt.sign(
      {
        id: existingUser._id,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = existingUser._doc;
    res.status(200).send({ status: true, data: { accessToken, ...others } });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: `invalid user`,
    });
  }
});

module.exports = router;
