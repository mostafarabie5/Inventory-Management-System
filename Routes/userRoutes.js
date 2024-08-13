const express = require("express");
const userController = require("../Controllers/userController");

const router = express.Router();

router.route("/registration").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;
