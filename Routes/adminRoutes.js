const express = require("express");
const adminController = require("../Controllers/adminController");

const router = express.Router();

router.route("/").get(adminController.getAllUsers);
router.route("/:id").delete(adminController.deleteUser);
router
  .route("/permission/:id")
  .patch(adminController.giveAdminPermission)
  .delete(adminController.removeAdminPermission);

module.exports = router;
