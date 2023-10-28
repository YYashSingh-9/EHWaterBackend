const IssueThreadModel = require("../Models/IssueThreadModel");
const CatchAsync = require("../Utils/CatchAsync");
const DefaultController = require("./DefaultController");

exports.createIssueThread =
  DefaultController.DefaultCreateOne(IssueThreadModel);
exports.getAllIssueThreads = DefaultController.DefaultReadAll(IssueThreadModel);
exports.getOneIssueThread = DefaultController.DefaultGetOne(IssueThreadModel);
exports.issueModifier = CatchAsync(async (req, res, next) => {
  req.body.userId = req.user._id;
  req.body.userName = req.user.name;
  console.log(req.body);
  console.log(req.user);
  next();
});
