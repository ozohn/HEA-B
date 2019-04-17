const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userimage: {
    type: String,
  },
  userdesc: {
    type: String,
  },
  userworks: {
    type: Array,
  },
});

module.exports = mongoose.model('User', userSchema);
