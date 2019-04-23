const express = require("express");
const router = express.Router();
const Work = require("../model/work.js");
const _u = require("../util.js");

router.post("/edit", async (req, res) => {});

router.post("/add", async (req, res) => {
  try {
    const query = {
      worktitle: req.body.worktitle,
      workimage: req.body.workimage,
      workdesc: req.body.workdesc,
      userid: req.user.userid
    };
    const work = new Work(query);
    const newData = await work.save();
    res.json(newData);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
