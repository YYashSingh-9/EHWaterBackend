const express = require("express");
const ReviewController = require("../Controllers/ReviewController");
const AuthController = require("../Controllers/AuthController");
const reviewRouter = express.Router();

reviewRouter
  .route("/:id")
  .get(ReviewController.id_value_changer, ReviewController.getYourReviews);
reviewRouter.use(AuthController.protect);
reviewRouter
  .route("/")
  .post(ReviewController.postOneReview)
  .get(ReviewController.getAllReviews);

module.exports = reviewRouter;
