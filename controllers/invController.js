const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = utilities.handleErrors(async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
})

/* ***********************************
* Build the inventory detail view (Task 1)
* ********************************* */
invCont.buildDetail = utilities.handleErrors(async function (req, res, next) {
  const inv_id = req.params.invId
  const vehicleData = await invModel.getInventoryById(inv_id)

  // 404 Error handling if vehicle not found
  if (!vehicleData) {
    let err = new Error("Sorry, that vehicle could not be found.")
    err.status = 404
    next(err)
    return
  }

  const nav = await utilities.getNav()
  const detailGrid = utilities.buildVehicleDetail(vehicleData)
  const title = `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`

  res.render("inventory/detail", {
    title: title,
    nav,
    detailGrid,
    errors: null,
  })
})

module.exports = invCont