const mongoose = require("mongoose");
const userworks = require("./work");

const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userimage: {
    type: String,
    default: ""
  },
  userdesc: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", userSchema);
