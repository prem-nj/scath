const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController.js");
const { logoutUser } = require("../controllers/authController.js");

userRouter.get("/", (req, res) => {
  res.send("userRouter working fine");
});

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", logoutUser);

module.exports = userRouter;
