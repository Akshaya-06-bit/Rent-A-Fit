const router = require("express").Router();
const { isLoggedIn } = require("../middleware/auth");
const order = require("../controllers/order.js");

router.get("/owner", isLoggedIn, order.getOwnerDashboard);
router.post("/owner/notifications/:id/read", isLoggedIn, order.markNotificationRead);

module.exports = router;
