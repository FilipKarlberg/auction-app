const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "7d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // using the static function inside userModel
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res
      .status(200)
      .json({ username: user.username, _id: user._id, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // using the static function inside userModel
    const user = await User.signup(email, password, username);

    // create a token
    const token = createToken(user._id);

    res
      .status(200)
      .json({ username: user.username, _id: user._id, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
