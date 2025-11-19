const utilities = require("../utilities/")

const baseController = {}

/* ***************************
 * Build home view 
 * ************************** */
baseController.buildHome = utilities.handleErrors(async function(req, res){
  const nav = await utilities.getNav() // Fix: Uncommented to restore functionality
  res.render("index", {title: "Home", nav})
})

/* *********************************
* Throw a 500 server error (Task 3)
* ********************************* */
baseController.throwError = utilities.handleErrors(async function(req, res, next) {
  // This will intentionally trigger a ReferenceError (which defaults to a 500 status)
  nonExistentFunction() 
})

module.exports = baseController