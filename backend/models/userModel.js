const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

// all signup logic here:

// static signup method
// 'this' does not work in arrow function, have to use standard async function
userSchema.statics.signup = async function (email, password, username) {
  // validation
  if (!email || !password || !username) {
    throw Error("Please fill all fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (password.length < 8) {
    throw Error("Password must be at least 8 characters long");
  }

  const existsEmail = await this.findOne({ email });

  if (existsEmail) {
    throw Error("Email already exists");
  }

  const existsUsername = await this.findOne({ username });

  if (existsUsername) {
    throw Error("Username already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, username });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("Please fill all fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("This account does not exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Wrong email or password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
