const router = require("express").Router();
const { isLoggedIn } = require("../middleware/auth");
const dashboardController = require("../controllers/dashboard");

// Customer Dashboard
router.get("/home/customer", isLoggedIn, dashboardController.customerDashboard);

// Owner Dashboard
router.get("/home/owner", isLoggedIn, dashboardController.ownerDashboard);

module.exports = router;
