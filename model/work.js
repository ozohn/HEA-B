const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  worktitle: {
    type: String,
    required: true
  },
  workimage: {
    type: String
  },
  workdesc: {
    type: String
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = mongoose.model("Work", userSchema);
