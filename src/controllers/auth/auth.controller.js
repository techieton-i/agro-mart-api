const User = require("../../models/User");
const _ = require("lodash");
const {
  validateRegisterBody,
  validateLoginBody,
} = require("./auth.validation");
const { filterJwtPayload } = require("../../utils/index");
const { encode, validate } = require("../../utils/jwt");
const bcrypt = require("bcrypt");

const AuthController = {
  async userRegistration(req, res) {
    const { error, value } = validateRegisterBody(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    let user = await User.findOne({ email: value.email });
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "email adddress already in use",
      });
    }
    let role = "";
    if (!value.role || value.role === "") {
      role = "user";
    } else {
      role = value.role;
    }
    user = await User.create({ ...value, role });
    user = _.pick(user, ["_id", "role", "email", "lastName", "firstName"]);

    return res.status(201).json({
      status: "success",
      message: "user registration successful",
      user,
    });
  },
  async userLogin(req, res) {
    const { error, value } = validateLoginBody(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    let user = await User.findOne({ email: value.email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        target: "email",
        message: "Email not registered",
      });
    }
    // password match
    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        target: "password",
        message: "Incorrect password",
      });
    }

    user = _.pick(user, [
      "_id",
      "firstName",
      "lastName",
      "email",
      "role",
      "lastLogin",
    ]);

    const filteredPayload = filterJwtPayload(user);
    const accessToken = encode(
      filteredPayload,
      process.env.accessTokenSecret,
      process.env.accessTokenExpiresIn
    );
    const refreshToken = encode(
      filteredPayload,
      process.env.refreshTokenSecret,
      process.env.refreshTokenExpiresIn
    );

    const tokens = {
      accessToken,
      refreshToken,
    };

    const now = new Date();
    await User.updateOne({ _id: user._id }, { lastLogin: now });

    return res.json({
      status: "success",
      message: "Login successful",
      user,
      tokens,
    });
  },
  async refreshToken(req, res) {
    const payload = validate(req.body.token, process.env.refreshTokenSecret);
    if (Date.now() >= payload.exp * 1000) {
      return res.status(401).json({ message: "Refresh Token Expired" });
    }
    let user = await User.findOne({ _id: payload._id });
    user = _.pick(user, ["_id", "email"]);
    const tokens = {
      accessToken: encode(
        user,
        process.env.accessTokenSecret,
        process.env.accessTokenExpiresIn
      ),
      refreshToken: encode(
        user,
        process.env.refreshTokenSecret,
        process.env.refreshTokenExpiresIn
      ),
    };
    return res.json({
      status: "success",
      message: "token refreshed",
      tokens,
    });
  },
  async updatePassword(req, res) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hash }
    );
    return res.status(200).json({ message: "Password updated" });
  },
  async getUsers(req, res) {
    const users = await User.find({});

    const modifiedUsers = users.map((txn, i) => {
      delete txn._doc.password;

      return { ...txn._doc, id: i };
    });

    return res.status(200).json({
      status: "success",
      users: modifiedUsers,
    });
  },
};
module.exports = AuthController;
