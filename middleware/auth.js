const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");
    const data = jwt.verify(token, process.env.SECRET);
    req.user = { id: data.id, email: data.email };
    return next();
  } catch (err) {
    return res.redirect("/login");
  }
};
