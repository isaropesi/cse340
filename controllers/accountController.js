/* **********************************
 * Account Controller
 * *********************************/
const utilities = require("../utilities/")

const accountController = {}

/* ***************************
 * Build login view 
 * ************************** */
accountController.buildLogin = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav,
    })
}

module.exports = accountController
