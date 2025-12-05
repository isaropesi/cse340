const utilities = require(".")
const { body, validationResult } = require("express-validator")
const reviewModel = require("../models/review-model")
const validate = {}

/*  **********************************
 *  Review Data Validation Rules
 * ********************************* */
validate.reviewRules = () => {
    return [
        // review_text is required and must be at least 10 characters
        body("review_text")
            .trim()
            .isLength({ min: 10 })
            .withMessage("Review must be at least 10 characters long.")
            .isLength({ max: 1000 })
            .withMessage("Review must not exceed 1000 characters."),

        // review_rating is required and must be between 1 and 5
        body("review_rating")
            .trim()
            .isInt({ min: 1, max: 5 })
            .withMessage("Rating must be between 1 and 5 stars."),

        // inv_id is required and must be a valid integer
        body("inv_id")
            .trim()
            .isInt()
            .withMessage("Invalid vehicle ID."),
    ]
}

/* ******************************
 * Check data and return errors or continue to add/update review
 * ***************************** */
validate.checkReviewData = async (req, res, next) => {
    const { review_text, review_rating, inv_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        const invModel = require("../models/inventory-model")
        const vehicleData = await invModel.getInventoryById(inv_id)
        const vehicleName = vehicleData
            ? `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`
            : "Unknown Vehicle"

        const title = req.body.review_id ? `Edit Review for ${vehicleName}` : `Review ${vehicleName}`
        const viewPath = req.body.review_id ? "reviews/edit-review" : "reviews/add-review"

        res.render(viewPath, {
            errors,
            title,
            nav,
            review_text,
            review_rating,
            inv_id,
            vehicleName,
            review_id: req.body.review_id || null
        })
        return
    }
    next()
}

module.exports = validate
