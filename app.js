const dotenv = require("dotenv");

dotenv.config({
  path: ".env",
});

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/userRoutes");
const itemRoutes = require("./Routes/itemRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const authController = require("./Controllers/authController");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.requestedAt = new Date().toUTCString();
  next();
});

app.use("/users", userRoutes);
app.use("/items", authController.protectItem, itemRoutes);
app.use("/admins", authController.adminPermission, adminRoutes);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    requestedAt: req.requestedAt,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
