const router = require("express").Router();
const { isLoggedIn } = require("../middleware/auth");
const upload = require("../config/multer");
const product = require("../controllers/product.js");

router.post("/", isLoggedIn, upload.single("image"), product.uploadProduct);

module.exports = router;
