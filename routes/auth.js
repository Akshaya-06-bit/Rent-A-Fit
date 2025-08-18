const router = require("express").Router();
const auth = require("../controllers/auth.js");

router.get("/", auth.getAccount);
router.get("/create", auth.getCreate);
router.get("/login", auth.getLogin);
router.get("/logout", auth.logout);

router.post("/usercreation", auth.createUser);
router.post("/loginuser", auth.loginUser);

module.exports = router;
