const express = require("express");
const { IsLoggedIn } = require("../middlewares/isloggedin");
const productModle = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productModle.find();
  res.render("shop", { products });
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

router.get("/shop", async (req, res) => {
  const products = await productModle.find();
  res.render("shop", { products });
});

module.exports = router;
