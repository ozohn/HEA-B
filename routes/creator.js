const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const Work = require("../model/work.js");
const _u = require("../util.js");

router.post("/edit", async (req, res) => {
  try {
    const query = { userid: req.user.userid };
    const updatedData = _u.updateData(req.body);
    const user = await User.findOneAndUpdate(query, updatedData);
    console.log(user);
    res.json(updatedData);
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const query = { userid: req.user.userid };
    const user = await User.findOne(query);
    const userWorks = await Work.find({ userid: user.userid });
    const userInfo = {
      userid: user.userid,
      userimage: user.userimage,
      userdesc: user.userdesc,
      username: user.username
    };
    res.json({ userInfo, userWorks });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
