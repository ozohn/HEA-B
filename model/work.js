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
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Work", workSchema);
