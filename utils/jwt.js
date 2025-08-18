const jwt = require("jsonwebtoken");
exports.sign = (payload) => jwt.sign(payload, process.env.SECRET);
