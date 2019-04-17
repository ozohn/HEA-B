const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  worktitle: {
    type: String,
  },
  workimage: {
    type: String,
  },
  workdesc: {
    type: String,
  },
});

module.exports = mongoose.model('Work', workSchema);