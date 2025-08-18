const router = require("express").Router();
const { isLoggedIn } = require("../middleware/auth");
const product = require("../controllers/product.js");
const order = require("../controllers/order.js");

router.get("/", isLoggedIn, (req, res) => {
  const user = req.user;
  res.render("Home", { user });
});

router.get("/rent", isLoggedIn, product.listAvailable);
router.get("/sellit", isLoggedIn, (req, res) => res.render("Sellit"));
router.get("/owner", isLoggedIn, order.getOwnerDashboard);

module.exports = router;
