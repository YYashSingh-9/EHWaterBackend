const mongoose = require("mongoose");

const IssueSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Your issue must have a title"],
  },
  state: {
    type: String,
    required: [true, "Please provide state."],
  },
  city: {
    type: String,
    required: [true, "Please provide your city name."],
  },
  details: {
    type: String,
    required: [true, "Issue details are necessary"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "User Id is missing here.."],
  },
  userName: {
    type: String,
    required: [true, "User name is missing , are u logged in?"],
  },
});

const IssueThreadModel = mongoose.model("IssueThreadModel", IssueSchema);
module.exports = IssueThreadModel;
