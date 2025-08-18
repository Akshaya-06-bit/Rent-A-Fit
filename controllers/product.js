const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

exports.listAvailable = asyncHandler(async (req, res) => {
  const products = await Product.find({ status: "available" });
  res.render("Buy", { products });
});

exports.listByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ status: "available", category });
  res.render("Buy", { products });
});

exports.uploadProduct = asyncHandler(async (req, res) => {
  const { name, price, discount, downpayment, size, description, status, category } = req.body;
  const image = req.file ? req.file.filename : undefined;

  await Product.create({
    name, price, discount, downpayment, size, description, status: status || "available",
    category, image, ownerId: req.user.id
  });

  res.redirect("/home");
});
