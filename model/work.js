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
  }
});

const Work = mongoose.model("Work", workSchema);

export { Work, workSchema };
