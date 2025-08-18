const router = require("express").Router();
const product = require("../controllers/product.js");
const { isLoggedIn } = require("../middleware/auth");

router.get("/", isLoggedIn, product.listAvailable);
router.get("/:category", isLoggedIn, product.listByCategory);

module.exports = router;
