const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1, min: 1 }
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  preferencesCompleted:{
    type : Boolean,
    default : false,
  },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  cart: [cartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
