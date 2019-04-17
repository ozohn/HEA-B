const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  worktitle: {
    type: String,
    default: '',
  },
  workimage: {
    type: String,
    default: '',
  },
  workdesc: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Work', workSchema);