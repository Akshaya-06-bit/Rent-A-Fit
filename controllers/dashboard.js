const Order = require("../models/Order");
const Notification = require("../models/Notification");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Helper: aggregate total per month
 */
function monthlyTotals(orders) {
  const months = {}; // e.g., { "2025-12": 600 }
  orders.forEach(o => {
    const d = o.createdAt;
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
    months[key] = (months[key] || 0) + o.total;
  });
  return months;
}

/**
 * GET /dashboard/customer
 */
exports.customerDashboard = asyncHandler(async (req, res) => {
  const orders = await Order.find({ buyerId: req.user.id }).populate("productId");
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  const months = monthlyTotals(orders);
  const chartLabels = Object.keys(months);
  const chartData = Object.values(months);

  // Predict next month using average of past months
  const predictedNext = chartData.length > 0 ? Math.round(chartData.reduce((a,b)=>a+b,0)/chartData.length) : 0;
  chartLabels.push("Next Month");
  chartData.push(predictedNext);

  res.render("CustomerDashboard", { user: req.user, orders, totalSpent, chartLabels, chartData });
});

/**
 * GET /dashboard/owner
 */
exports.ownerDashboard = asyncHandler(async (req, res) => {
  const orders = await Order.find({ ownerId: req.user.id }).populate("productId");
  const totalEarned = orders.reduce((sum, o) => sum + o.total, 0);

  const months = monthlyTotals(orders);
  const chartLabels = Object.keys(months);
  const chartData = Object.values(months);

  // Predict next month using average of past months
  const predictedNext = chartData.length > 0 ? Math.round(chartData.reduce((a,b)=>a+b,0)/chartData.length) : 0;
  chartLabels.push("Next Month");
  chartData.push(predictedNext);

  const notifications = await Notification.find({ ownerId: req.user.id }).sort({ createdAt: -1 }).populate("productId");

  res.render("OwnerDashboard", { user: req.user,orders, totalEarned, notifications, chartLabels, chartData });
});
