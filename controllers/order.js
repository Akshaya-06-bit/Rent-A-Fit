const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Notification = require("../models/Notification");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.buyNow = asyncHandler(async (req, res) => {
  const cartItemId = req.params.id;
  const user = await User.findById(req.user.id).populate("cart.productId");
  const cartItem = user.cart.find(i => i._id.toString() === cartItemId);
  if (!cartItem) throw new AppError("Item not found in cart", 404);
  if (!cartItem.productId) throw new AppError("Product not found", 404);

  const product = cartItem.productId;
  if (product.status !== "available") throw new AppError("Product not available", 400);

  const qty = Number(cartItem.quantity) || 1;
  const unitPrice = Number(product.price) || 0;
  const total = unitPrice * qty;

  // Create order
  const order = await Order.create({
    buyerId: user._id,
    productId: product._id,
    ownerId: product.ownerId,
    quantity: qty,
    unitPrice,
    total,
    status: "paid"
  });

  // Notify owner
  await Notification.create({
    ownerId: product.ownerId,
    productId: product._id,
    message: `Your product "${product.name}" was purchased. Order #${order._id}.`
  });

  // Mark as sold (remove from listing)
  product.status = "sold";
  await product.save();

  // Remove from cart
  user.cart = user.cart.filter(i => i._id.toString() !== cartItemId);
  await user.save();

  res.render("Invoice", { price: total, ownerid: product.ownerId.toString() });
});

// exports.getOwnerDashboard = asyncHandler(async (req, res) => {
//   // Show owner notifications + owned products
//   const notifications = await Notification.find({ ownerId: req.user.id })
//     .sort({ createdAt: -1 })
//     .populate("productId");
//   res.render("OwnerDashboard", { notifications });
// });

exports.markNotificationRead = asyncHandler(async (req, res) => {
  const NotificationModel = require("../models/Notification");
  await NotificationModel.findByIdAndUpdate(
    req.params.id,
    { $set: { read: true } },
    { new: true }
  );
  res.redirect("/orders/owner");
});
