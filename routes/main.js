if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const Work = require('../model/work.js');

router.post('/works', async (req, res) => {
  console.log('start');
  await Work.find({}, '_id worktitle workimage workdesc', (err, works) => {
    try {
      console.log(works.length);
      res.json(works);
    } catch (err) {
      res.send(err.message);
    }
  })
    .skip((req.body.index - 1) * 24)
    .limit(24);
});

module.exports = router;
