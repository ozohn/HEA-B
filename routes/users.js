if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user.js");

router.get("/", function(req, res) {
  res.send("Hello");
});
router.post("/signin", async (req, res) => {
  let searchOptions = {};
  if (req.body.userid !== null && req.body.userid !== "") {
    searchOptions.userid = req.body.userid;
    searchOptions.password = req.body.password;
  }
  try {
    const user = await User.findOne(searchOptions);
    if (user) {
      const bMatch = await bcrypt.compare(req.body.password, user.password);
      if (bMatch) {
        createToken(user, res, next);
        res.json({
          done: "signin",
          author: author
        });
      } else {
        res.json({ error: "비밀번호가 틀립니다." });
      }
    }
  } catch {
    res.json({ err: "signin error" });
  }
});
router.post("/signup", async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.body.userid });
    if (user) {
      res.json({ error: "중복된 아이디가 있습니다." });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password.trim(), 12);
      const user = new User({
        userid: req.body.userid,
        password: hashedPassword,
        username: req.body.username
      });
      const newUser = await user.save();
      const payload = {
        userid: newUser.userid,
        username: newUser.username
      };
      try {
        const token = jwt.sign(payload, "secret", { expiresIn: "1d" });
        res.json({ token });
      } catch {
        res.json({ error: "token 생성이 실패하였습니다." });
      }
      next();
    }
  } catch {
    res.json({ error: "signup error" });
  }
});

module.exports = router;
