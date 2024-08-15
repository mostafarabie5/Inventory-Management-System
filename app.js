const dotenv = require("dotenv");

dotenv.config({
  path: ".env",
});

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/authRoutes");
const itemRoutes = require("./Routes/itemRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const authController = require("./Controllers/authController");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.requestedAt = new Date().toUTCString();
  next();
});

app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/items", authController.protectItem, itemRoutes);
app.use("/api/v1/admins", authController.adminPermission, adminRoutes);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    requestedAt: req.requestedAt,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
