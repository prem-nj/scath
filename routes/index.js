const express = require("express");
const { IsLoggedIn } = require("../middlewares/isloggedin");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("page home");
});

router.get("/index", (req, res) => {
  res.render("index");
});

router.get("/users/register", (req, res) => {
  res.render("registration");
});

router.get("/users/login", (req, res) => {
  res.render("login");
});

router.get("/owners/admin", (req, res) => {
  res.render("admin");
});

module.exports = router;
