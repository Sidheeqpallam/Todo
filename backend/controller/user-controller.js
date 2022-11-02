const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
require("express-session");

//@disc Register new User
//@api POST /api/register
//@access Public
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  // Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create User

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    req.session.user = user;
    res.status(201).json({
      name: user.name,
      email: user.email,
      _id: user._id,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("invalid user details");
  }
};

//@disc Login user
//@api POST /api/user/login
//@access Public
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.json({
      name: user.name,
      email: user.email,
      _id: user._id,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid  details.");
  }
};

//@disc Logout
//@api GET /api/user/logout
//@access Privete
const logout = (req, res) => {
  req.session.distroy();
  res.json("Successfully logouted.");
};

module.exports = {
  register,
  login,
  logout,
};
