const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.updatedAt;
  delete obj.__v;

  return obj;
};
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this.id }, JWT_SECRET_KEY, { expiresIn: '1d' });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
