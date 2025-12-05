// Needed Resources 
const express = require("express")
const router = new express.Router()
const reviewController = require("../controllers/reviewController")
const utilities = require("../utilities/")
const reviewValidate = require('../utilities/review-validation')

// Route to build add review view
router.get("/add/:invId", utilities.checkLogin, reviewController.buildAddReviewView)

// Route to process add review
router.post(
    "/add",
    utilities.checkLogin,
    reviewValidate.reviewRules(),
    reviewValidate.checkReviewData,
    reviewController.addReview
)

// Route to build edit review view
router.get("/edit/:reviewId", utilities.checkLogin, reviewController.buildEditReviewView)

// Route to process edit review
router.post(
    "/update",
    utilities.checkLogin,
    reviewValidate.reviewRules(),
    reviewValidate.checkReviewData,
    reviewController.updateReview
)

// Route to build delete review view
router.get("/delete/:reviewId", utilities.checkLogin, reviewController.buildDeleteReviewView)

// Route to process delete review
router.post("/delete", utilities.checkLogin, reviewController.deleteReview)

// Route to view user's reviews
router.get("/my-reviews", utilities.checkLogin, reviewController.buildUserReviewsView)

module.exports = router
