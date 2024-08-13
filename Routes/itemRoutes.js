const express = require("express");
const itemController = require("../Controllers/itemController");
const authController = require("../Controllers/authController");

const router = express.Router();

router
  .route("/mechanical")
  .post(authController.adminPermission, itemController.addMechanicalPart)
  .get(itemController.getMechanicalParts);

router
  .route("/electrical")
  .post(authController.adminPermission, itemController.addElectricalPart)
  .get(itemController.getElectricalParts);

router
  .route("/raw")
  .post(authController.adminPermission, itemController.addRawMaterial)
  .get(itemController.getRawMaterials);

router.route("/").get(itemController.getAllItems);

module.exports = router;
