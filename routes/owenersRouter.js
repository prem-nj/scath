const express = require("express");
const ownersRouter = express.Router();
const ownerModel = require("../models/Owner");

ownersRouter.get("/", (req, res) => {
  res.send("yes product working ");
});

if (process.env.NODE_ENV === "development") {
  ownersRouter.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length >= 1) {
      res.status(500).send("you can not create more user");
    } else {
      let { username, email, password } = req.body;

      const createuser = await ownerModel.create({
        username,
        email,
        password,
      });
      res.status(200).send("created user");
    }
  });
}

module.exports = ownersRouter;
