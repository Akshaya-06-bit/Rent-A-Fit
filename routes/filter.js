const router = require("express").Router();
const { isLoggedIn } = require("../middleware/auth");
const filter = require("../controllers/filter.js");

router.get("/:category", isLoggedIn, filter.filterByCategory);

module.exports = router;
