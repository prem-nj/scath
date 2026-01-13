const express = require("express");
const upload = require("../middlewares/multer.midddleware");
const productRouter = express.Router();

const uploadOnCloudinary = require("../utils/cloudinary");
const productModle = require("../models/Product");

productRouter.get("/", (req, res) => {
  res.send("product router is fine");
});

productRouter.get("/upload", async (req, res) => {
  const products = await productModle.find();
  const success = req.flash("success");
  res.render("createproducts", { products, success });
});

productRouter.post(
  "/upload",
  upload.single("image"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const {
        productName,
        price,
        discount,
        Number,
        bgcolor,
        pancolor,
        textcolor,
        strikeAmount,
      } = req.body;

      console.log("Form data received:", req.body);
      console.log("bgcolor value:", bgcolor);

      const filePath = req.file.path;

      // Upload to Cloudinary
      const result = await uploadOnCloudinary(filePath);

      if (!result) {
        return res.status(500).send("Error uploading image to Cloudinary.");
      }

      // Create product in database
      const product = await productModle.create({
        productName,
        price,
        image: result.secure_url,
        discount,
        Number,
        color: bgcolor,
        textcolor,
        strikeAmount,
      });

      // Fetch all products from database
      const products = await productModle.find();

      req.flash("success", "Products created successfully!");

      // Redirect to show flash message
      res.redirect("/products/upload");
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).send("Error uploading image.");
    }
  }
);

productRouter.get("/delete/:id", async (req, res) => {
  let deleted = await productModle.findOneAndDelete({ _id: req.params.id });
  req.flash("success", "deleted successfully");
  res.redirect("/products/upload");
});

module.exports = productRouter;
