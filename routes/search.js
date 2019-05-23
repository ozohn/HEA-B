const express = require("express");
const router = express.Router();

const User = require("../model/user.js");
const Work = require("../model/work.js");
const _u = require("../util.js");

router.post("/author", async (req, res) => {
  try {
    const pattern = new RegExp(req.body.inputValue);
    const user = await User.find(
      { username: pattern },
      { userid: true, username: true, userimage: true, userdesc: true }
    );
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ message: "일치하는 정보 없음" });
    }
  } catch {
    res.sendStatus(404);
  }
});

router.post("/author/pages", async (req, res) => {
  try {
    const user = await User.findOne(
      { userid: req.body.userid },
      { username: true, userdesc: true, userimage: true, userid: true }
    );
    const works = await Work.find({ userid: req.body.userid });
    const obj = { user, works };
    if (user) {
      res.json(obj);
    } else {
      res.status(404).send({ message: "전달된 데이터 없음" });
    }
  } catch {
    res.sendStatus(404);
  }
});

router.post("/work", async (req, res) => {
  try {
    const pattern = new RegExp(req.body.inputValue);
    const work = await Work.find(
      { worktitle: pattern },
      { worktitle: true, workimage: true, workdesc: true }
    );
    if (work) {
      res.json(work);
    } else {
      res.status(404).send({ message: "일치하는 정보 없음" });
    }
  } catch {
    res.sendStatus(404);
  }
});

module.exports = router;
