if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const User = require('../model/user.js');

router.post('/author', async (req, res) => {
  console.log(req.body.inputValue);
  await User.find(
    { username: `/${req.body.inputValue}/` },
    'username, userimage, userdesc',
    (err, users) => {
      try {
        console.log(users);
        res.json(users);
      } catch (err) {
        res.send(err.message);
      }
    }
  );
});

module.exports = router;
