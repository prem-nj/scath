const express = require("express");
const upload = require("../middlewares/multer.midddleware");
const productRouter = express.Router();

const uploadOnCloudinary = require("../utils/cloudinary");
const productModle = require("../models/Product");

productRouter.get("/", (req, res) => {
  res.send("product router is fine");
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
      } = req.body;

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
        bgcolor,
        pancolor,
        textcolor,
      });

      // Render shop page with product data
      res.render("shop", { product });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).send("Error uploading image.");
    }
  }
);

module.exports = productRouter;
