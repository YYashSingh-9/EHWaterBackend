const express = require("express");
const IssueThreadController = require("../Controllers/IssueThreadController");
const AuthController = require("../Controllers/AuthController");
const issueThreadRouter = express.Router();

issueThreadRouter.route("/").get(IssueThreadController.getAllIssueThreads);
issueThreadRouter.route("/:id").get(IssueThreadController.getOneIssueThread);
issueThreadRouter.use(AuthController.protect);
issueThreadRouter
  .route("/")
  .post(
    IssueThreadController.issueModifier,
    IssueThreadController.createIssueThread
  );

module.exports = issueThreadRouter;
