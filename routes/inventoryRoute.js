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
router.get("/", utilities.checkAccountType, invController.buildManagementView);

// Route to build add classification view
router.get("/add-classification", utilities.checkAccountType, invController.buildAddClassificationView);

// Process the add classification data
router.post(
  "/add-classification",
  utilities.checkAccountType,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  invController.addClassification
);

// Route to build add inventory view
router.get("/add-inventory", utilities.checkAccountType, invController.buildAddInventoryView);

// Process the add inventory data
router.post(
  "/add-inventory",
  utilities.checkAccountType,
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  invController.addInventory
);

// Route to build vehicle detail view (Task 1)
router.get("/detail/:invId", invController.buildDetail);

// Route to build edit inventory view
router.get("/edit/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.editInventoryView));

// Process the update inventory data
router.post(
  "/update/",
  utilities.checkAccountType,
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);

// Route to build delete inventory confirmation view
router.get("/delete/:inv_id", utilities.checkAccountType, utilities.handleErrors(invController.deleteView));

// Process the delete inventory data
router.post("/delete/", utilities.checkAccountType, utilities.handleErrors(invController.deleteItem));

module.exports = router