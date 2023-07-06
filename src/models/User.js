const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role:{
      type:String,
      enum:['farmer', 'user', 'admin']
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
      next();
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

module.exports = mongoose.model("User", UserSchema);
