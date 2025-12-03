// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to get inventory by classification_id (JSON)
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route to build inventory management view
router.get("/", invController.buildManagementView);

// Route to build add classification view
router.get("/add-classification", invController.buildAddClassificationView);

// Process the add classification data
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  invController.addClassification
);

// Route to build add inventory view
router.get("/add-inventory", invController.buildAddInventoryView);

// Process the add inventory data
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  invController.addInventory
);

// Route to build vehicle detail view (Task 1)
router.get("/detail/:invId", invController.buildDetail);

module.exports = router