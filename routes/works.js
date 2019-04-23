const express = require("express");
const router = express.Router();
const Work = require("../model/work.js");
const _u = require("../util.js");

router.post("/edit", async (req, res) => {});

router.post("/add", async (req, res) => {
  try {
    const query = {
      worktitle: req.work.worktitle,
      workimage: req.work.workimage,
      workdesc: req.work.workdesc,
      userid: req.user.userid
    };
    const work = new Work(query);
    work.save();
    res.json(work);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
