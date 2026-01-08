const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const generateToken = require("../utils/generateToken");
const cookie = require("cookie-parser");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        const user = await userModel.findOne({ email });
        if (user) {
          return res.send("you have account already");
        }

        const createduser = await userModel.create({
          fullname,
          email,
          password: hash,
        });

        const token = generateToken(createduser);
        res.cookie("token", token);

        res.redirect("/shop");
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send("Email or password is incorrect");
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        const token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
      } else {
        res.status(401).send("Email or password is incorrect");
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
