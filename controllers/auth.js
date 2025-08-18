const bcrypt = require("bcrypt");
const User = require("../models/User");
const { sign } = require("../utils/jwt");
const asyncHandler = require("../utils/asyncHandler");

exports.getAccount = (req, res) => res.render("Account");
exports.getCreate = (req, res) => res.render("Create");
exports.getLogin = (req, res) => res.render("Login");

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).send("User already exists");
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  const token = sign({ id: user._id, email });
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/home");
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid credentials");
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).send("Invalid credentials");
  const token = sign({ id: user._id, email });
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/home");
});

exports.logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.redirect("/");
}

