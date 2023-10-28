const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    maxlength: [20, "Name must be within 20 characters"],
    minlength: [4, "Name must be atleast 5 character long"],
    required: [true, "Nume is a must"],
  },
  email: {
    type: String,
    required: [true, "E-mail is a must. Please fill it ."],
    validate: [validator.isEmail, "Please provide Valid email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: [7, "Password must be at least 8 characters long."],
    required: [true, "Password is a must"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    minlength: [7, "Password must be at least 8 characters long."],
    required: [true, "Password is a must"],
    validate: {
      // this runs only on 'save' & 'create'
      validator: function (el) {
        return el === this.password;
      },
      mesasage: "Confirm password must match with password",
    },
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("passwordConfirm")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  console.log(this.password);
  next();
});
UserSchema.methods.correctPassword = async function (
  savedPassword,
  userPassword
) {
  return bcrypt.compare(savedPassword, userPassword);
};

const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = UserModel;
