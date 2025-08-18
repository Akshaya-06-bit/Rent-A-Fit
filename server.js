const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// DB
connectDB();

// Core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static
app.use("/multer", express.static(path.join(__dirname, "multer")));
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/auth.js"));  
app.use("/home", require("./routes/home.js")); 
app.use("/uploadproduct", require("./routes/upload.js"));
app.use("/filter", require("./routes/filter.js"));
app.use("/cart", require("./routes/cart.js"));
app.use("/orders", require("./routes/order.js"));
app.use("/products", require("./routes/product.js"));

// 404
app.use((req, res) => res.status(404).send("Not Found"));

// Error handler
const errorHandler = require("./middleware/error");
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on ${PORT}`));
