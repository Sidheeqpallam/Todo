const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controller/user-controller");
const { protect } = require("../middleware/auth-middleware");

router.get("/", protect);
router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);

module.exports = router;
