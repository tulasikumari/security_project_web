const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  passwordHistory: [String], 

  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  lastFailedLogin: {
    type: Date,
    default: null,
  },
  passwordLastChanged: {   // New field for tracking password change date
    type: Date,
    default: Date.now,
  },
  
});

const Users = mongoose.model("User", userSchema);
module.exports = Users;
