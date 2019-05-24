import mongoose from "mongoose";

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

const Work = mongoose.model("Work", workSchema);

export { Work, workSchema };
