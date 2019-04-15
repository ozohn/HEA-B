if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user.js');

router.get('/', function(req, res) {
  res.send('Hello');
});

async function signIn(user, req, res) {
  const bMatch = await bcrypt.compare(req.body.password, user.password);
  if (bMatch) {
    const payload = {
      userid: user.userid,
      username: user.username,
    };
    //try catch 제거
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.json({ error: '비밀번호가 틀립니다.' });
  }
}

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.body.userid });
    if (user) {
      signIn(user, req, res);
    }
    //   if (user) {
    //     const bMatch = await bcrypt.compare(req.body.password, user.password);
    //     if (bMatch) {
    //       const payload = {
    //         userid: user.userid,
    //         username: user.username,
    //       };
    //       try {
    //         const token = jwt.sign(payload, 'secret', { expiresIn: '1d' });
    //         res.json({ token });
    //       } catch {
    //         res.json({ error: 'token 생성이 실패하였습니다.' });
    //       }
    //     } else {
    //       res.json({ error: '비밀번호가 틀립니다.' });
    //     }
    //   }함수로 뺌
  } catch (e) {
    res.json({ err: e });
  }
});

async function signUp(user, req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password.trim(), 12);
  user = new User({
    userid: req.body.userid,
    password: hashedPassword,
    username: req.body.username,
  });
  const newUser = await user.save();
  const payload = {
    userid: newUser.userid,
    username: newUser.username,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  res.json({ token });
}

router.post('/signup', async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.body.userid });
    if (user) {
      res.json({ error: '중복된 아이디가 있습니다.' });
    } else {
      signUp(user, req, res);
      // const hashedPassword = await bcrypt.hash(req.body.password.trim(), 12);
      // const user = new User({
      //   userid: req.body.userid,
      //   password: hashedPassword,
      //   username: req.body.username,
      // });
      // const newUser = await user.save();
      // const payload = {
      //   userid: newUser.userid,
      //   username: newUser.username,
      // };
      // try {
      //   const token = jwt.sign(payload, 'secret', { expiresIn: '1d' });
      //   res.json({ token });
      // } catch {
      //   res.json({ error: 'token 생성이 실패하였습니다.' });
      // }
    }
  } catch (err) {
    res.json({ error: err.message });
  }
  //토큰 post 로 보내기
});

module.exports = router;
