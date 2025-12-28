const router = require("express").Router();
const { isLoggedIn } = require("../middleware/auth");
const dashboard = require("../controllers/dashboard.js");
const order = require("../controllers/order.js")
router.get("/owner", isLoggedIn, dashboard.ownerDashboard);
router.post("/owner/notifications/:id/read", isLoggedIn, order.markNotificationRead);

module.exports = router;
