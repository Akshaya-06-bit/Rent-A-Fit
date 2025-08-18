const router = require("express").Router();
const { isLoggedIn } = require("../middleware/auth");
const cart = require("../controllers/cart.js");
const order = require("../controllers/order.js");

router.get("/", isLoggedIn, cart.getCart);
router.post("/add", isLoggedIn, cart.addToCart);
router.post("/delete/:id", isLoggedIn, cart.removeFromCart);
router.post("/buynow/:id", isLoggedIn, order.buyNow);

module.exports = router;
