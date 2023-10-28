const UserModel = require("../Models/UserModel");
const IssueModel = require("../Models/IssueThreadModel");
const ReviewModel = require("../Models/ReviewsModal");
const AppError = require("../Utils/AppError");
const DefaultController = require("./DefaultController");
const CatchAsync = require("../Utils/CatchAsync");

// Helper function
const filterObj = (obj, ...allowedFields) => {
  const filterObject = {};
  const hel = Object.keys(obj);
  hel.forEach((el) => {
    if (allowedFields.includes(el)) {
      return (filterObject[el] = obj[el]);
    }
  });
  return filterObject;
};

exports.updateMe = CatchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("Password fields are not allowed.", 400));
  }

  const filteredObj = filterObj(req.body, "name", "email");

  const user = await UserModel.findByIdAndUpdate(req.user._id, filteredObj, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError("Can't update the user some error occured.", 400));
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});
exports.getOneUser = DefaultController.DefaultGetOne(UserModel);

exports.getAllUserPosts = CatchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const doc = await IssueModel.find({ userId: { $in: userId } });
  const doc2 = await ReviewModel.find({ userId: { $in: userId } });
  const docToSend = [...doc, ...doc2];

  res.status(200).json({
    status: "success",
    data: docToSend,
  });
});
