const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: String,
  price: { type: Number, required: true, min: 0 },
  downpayment: { type: Number, default: 0, min: 0 },
  size: { type: String, enum: ["XS", "S", "M", "L", "XL", "XXL"] },
  description: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["available", "rented", "sold"], default: "available" },
  category: { type: String, enum: ["men", "women", "kids"], required: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
