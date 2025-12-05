const reviewModel = require("../models/review-model")
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const reviewCont = {}

/* ***********************************
* Build the add review view
* ********************************* */
reviewCont.buildAddReviewView = utilities.handleErrors(async function (req, res, next) {
    const inv_id = parseInt(req.params.invId)
    const vehicleData = await invModel.getInventoryById(inv_id)

    if (!vehicleData) {
        req.flash("notice", "Vehicle not found.")
        return res.redirect("/")
    }

    // Check if user is logged in
    if (!res.locals.loggedin) {
        req.flash("notice", "Please log in to leave a review.")
        return res.redirect("/account/login")
    }

    // Check if user has already reviewed this vehicle
    const hasReviewed = await reviewModel.hasUserReviewed(inv_id, res.locals.accountData.account_id)
    if (hasReviewed) {
        req.flash("notice", "You have already reviewed this vehicle.")
        return res.redirect(`/inv/detail/${inv_id}`)
    }

    let nav = await utilities.getNav()
    const vehicleName = `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`

    res.render("reviews/add-review", {
        title: `Review ${vehicleName}`,
        nav,
        errors: null,
        inv_id,
        vehicleName,
        review_text: "",
        review_rating: ""
    })
})

/* ***********************************
* Process the add review form
* ********************************* */
reviewCont.addReview = utilities.handleErrors(async function (req, res) {
    const { review_text, review_rating, inv_id } = req.body
    const account_id = res.locals.accountData.account_id

    // Validate inputs
    if (!review_text || !review_rating || !inv_id) {
        req.flash("notice", "Please provide all required fields.")
        return res.redirect(`/review/add/${inv_id}`)
    }

    // Check if user has already reviewed this vehicle
    const hasReviewed = await reviewModel.hasUserReviewed(inv_id, account_id)
    if (hasReviewed) {
        req.flash("notice", "You have already reviewed this vehicle.")
        return res.redirect(`/inv/detail/${inv_id}`)
    }

    const addResult = await reviewModel.addReview(
        review_text,
        parseInt(review_rating),
        parseInt(inv_id),
        account_id
    )

    if (addResult) {
        req.flash("notice", "Review added successfully!")
        res.redirect(`/inv/detail/${inv_id}`)
    } else {
        let nav = await utilities.getNav()
        const vehicleData = await invModel.getInventoryById(inv_id)
        const vehicleName = `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`

        req.flash("notice", "Sorry, adding the review failed.")
        res.status(501).render("reviews/add-review", {
            title: `Review ${vehicleName}`,
            nav,
            errors: null,
            inv_id,
            vehicleName,
            review_text,
            review_rating
        })
    }
})

/* ***********************************
* Build the edit review view
* ********************************* */
reviewCont.buildEditReviewView = utilities.handleErrors(async function (req, res, next) {
    const review_id = parseInt(req.params.reviewId)
    const reviewData = await reviewModel.getReviewById(review_id)

    if (!reviewData) {
        req.flash("notice", "Review not found.")
        return res.redirect("/account/")
    }

    // Check if the logged-in user owns this review
    if (reviewData.account_id !== res.locals.accountData.account_id) {
        req.flash("notice", "You can only edit your own reviews.")
        return res.redirect("/account/")
    }

    let nav = await utilities.getNav()
    const vehicleName = `${reviewData.inv_year} ${reviewData.inv_make} ${reviewData.inv_model}`

    res.render("reviews/edit-review", {
        title: `Edit Review for ${vehicleName}`,
        nav,
        errors: null,
        review_id: reviewData.review_id,
        review_text: reviewData.review_text,
        review_rating: reviewData.review_rating,
        vehicleName,
        inv_id: reviewData.inv_id
    })
})

/* ***********************************
* Process the edit review form
* ********************************* */
reviewCont.updateReview = utilities.handleErrors(async function (req, res) {
    const { review_id, review_text, review_rating, inv_id } = req.body

    // Verify ownership
    const reviewData = await reviewModel.getReviewById(review_id)
    if (reviewData.account_id !== res.locals.accountData.account_id) {
        req.flash("notice", "You can only edit your own reviews.")
        return res.redirect("/account/")
    }

    const updateResult = await reviewModel.updateReview(
        parseInt(review_id),
        review_text,
        parseInt(review_rating)
    )

    if (updateResult) {
        req.flash("notice", "Review updated successfully!")
        res.redirect(`/inv/detail/${inv_id}`)
    } else {
        let nav = await utilities.getNav()
        const vehicleData = await invModel.getInventoryById(inv_id)
        const vehicleName = `${vehicleData.inv_year} ${vehicleData.inv_make} ${vehicleData.inv_model}`

        req.flash("notice", "Sorry, updating the review failed.")
        res.status(501).render("reviews/edit-review", {
            title: `Edit Review for ${vehicleName}`,
            nav,
            errors: null,
            review_id,
            review_text,
            review_rating,
            vehicleName,
            inv_id
        })
    }
})

/* ***********************************
* Build the delete review confirmation view
* ********************************* */
reviewCont.buildDeleteReviewView = utilities.handleErrors(async function (req, res, next) {
    const review_id = parseInt(req.params.reviewId)
    const reviewData = await reviewModel.getReviewById(review_id)

    if (!reviewData) {
        req.flash("notice", "Review not found.")
        return res.redirect("/account/")
    }

    // Check if the logged-in user owns this review
    if (reviewData.account_id !== res.locals.accountData.account_id) {
        req.flash("notice", "You can only delete your own reviews.")
        return res.redirect("/account/")
    }

    let nav = await utilities.getNav()
    const vehicleName = `${reviewData.inv_year} ${reviewData.inv_make} ${reviewData.inv_model}`

    res.render("reviews/delete-review", {
        title: `Delete Review for ${vehicleName}`,
        nav,
        errors: null,
        review_id: reviewData.review_id,
        review_text: reviewData.review_text,
        review_rating: reviewData.review_rating,
        vehicleName,
        inv_id: reviewData.inv_id
    })
})

/* ***********************************
* Process the delete review
* ********************************* */
reviewCont.deleteReview = utilities.handleErrors(async function (req, res) {
    const { review_id, inv_id } = req.body

    // Verify ownership
    const reviewData = await reviewModel.getReviewById(review_id)
    if (reviewData.account_id !== res.locals.accountData.account_id) {
        req.flash("notice", "You can only delete your own reviews.")
        return res.redirect("/account/")
    }

    const deleteResult = await reviewModel.deleteReview(parseInt(review_id))

    if (deleteResult) {
        req.flash("notice", "Review deleted successfully!")
        res.redirect(`/inv/detail/${inv_id}`)
    } else {
        req.flash("notice", "Sorry, deleting the review failed.")
        res.redirect(`/review/delete/${review_id}`)
    }
})

/* ***********************************
* Build the user's reviews management view
* ********************************* */
reviewCont.buildUserReviewsView = utilities.handleErrors(async function (req, res, next) {
    const account_id = res.locals.accountData.account_id
    const reviews = await reviewModel.getReviewsByAccountId(account_id)

    let nav = await utilities.getNav()

    res.render("reviews/my-reviews", {
        title: "My Reviews",
        nav,
        errors: null,
        reviews
    })
})

module.exports = reviewCont
