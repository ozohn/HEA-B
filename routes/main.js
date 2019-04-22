if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const User = require('../model/user.js');

router.post('/users', async (req, res) => {
  await User.find({}, 'username userimage userdesc', (err, users) => {
    try {
      res.json(users);
    } catch(err) {
      res.send(err.message);
    }
  })
});

module.exports = router;
