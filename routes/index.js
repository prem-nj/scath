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

router.get("/shop",(req,res)=>{
  res.render("shop");
})


module.exports = router;
