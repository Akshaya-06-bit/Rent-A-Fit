const router = require("express").Router();
const { isLoggedIn } = require("../middleware/auth");
const product = require("../controllers/product.js");
const order = require("../controllers/order.js");
const dashboard = require("../controllers/dashboard.js");
router.get("/", isLoggedIn, (req, res) => {
  const user = req.user;
  res.render("Home", { user });
});

router.get("/rent", isLoggedIn, product.listAvailable);
router.get("/sellit", isLoggedIn, (req, res) => res.render("Sellit"));
router.get("/owner", isLoggedIn, dashboard.ownerDashboard);
router.get("/customer", isLoggedIn, dashboard.customerDashboard);
module.exports = router;
