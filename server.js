const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const dashboardRoutes = require("./routes/dashboard.js");
// DB
connectDB();

// Core middleware
app.use(cors());
app.use(express.json()); // parses incoming requests
app.use(express.urlencoded({ extended: true })); // to use info coming from forms
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
app.use("/dashboard", dashboardRoutes);
// 404
app.use((req, res) => res.status(404).send("Not Found"));

// Error handler
const errorHandler = require("./middleware/error");
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on ${PORT}`));