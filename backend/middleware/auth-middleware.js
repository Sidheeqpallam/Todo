const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token

      const user = await User.findById(decoded.id).select("-password");
      if (user.email == req.session.email) {
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized");
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized,no token");
  }
};
module.exports = { protect };
