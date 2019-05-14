if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const Work = require('../model/work.js');

router.post('/works', async (req, res) => {
  await Work.find({}, '_id workimage workdesc', (err, users) => {
    try {
      res.json(users);
    } catch (err) {
      res.send(err.message);
    }
  })
    .skip(req.body.index)
    .limit(1);
});

module.exports = router;
