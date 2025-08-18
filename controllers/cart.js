const User = require("../models/User");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

exports.getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("cart.productId");
  const cartItems = user.cart || [];
  const total = cartItems.reduce((sum, item) => {
    const p = item.productId;
    if (!p) return sum;
    const unit = Number(p.price) || 0;
    return sum + unit * (Number(item.quantity) || 0);
  }, 0);
  res.render("Cart", { cartItems, total });
});

exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const qty = Math.max(1, Number(quantity) || 1);

  const user = await User.findById(req.user.id);
  const existing = user.cart.find(i => i.productId.toString() === productId);
  if (existing) existing.quantity += qty;
  else user.cart.push({ productId, quantity: qty });

  await user.save();
  res.redirect("/cart");
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const cartItemId = req.params.id;
  const user = await User.findById(req.user.id);
  user.cart = user.cart.filter(i => i._id.toString() !== cartItemId);
  await user.save();
  res.redirect("/cart");
});
