const ReviewModal = require("../Models/ReviewsModal");
const DefaultController = require("./DefaultController");
const CatchAsync = require("../Utils/CatchAsync");

exports.postOneReview = DefaultController.DefaultCreateOne(ReviewModal);
exports.getAllReviews = DefaultController.DefaultReadAll(ReviewModal);
exports.getYourReviews = CatchAsync(async (req, res, next) => {
  const issId = req.params.id;
  const doc = await ReviewModal.find({ issueId: { $in: issId } });
  req.body = doc;
  console.log(doc);
  res.status(200).json({
    status: "success",
    data: doc,
  });
});
exports.id_value_changer = (req, res, next) => {
  // req.params.id = req.body.issueId;
  console.log(req.params.id);
  next();
};
