const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

exports.filterByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ status: "available", category });
  res.render("Buy", { products });
});
