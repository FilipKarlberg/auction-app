const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // split to remove "bearer " from authorization header
  // it originally looks something like: "bearer asdfghilkj.asdfasdf.qwerqwer"
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);

    if (err.name === "TokenExpiredError") {
      // Handle token expired error
      return res
        .status(401)
        .json({ error: "Token expired. Please log in again." });
    }

    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
