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

const checkTokenError = (err, token, res) => {
  if (err) res.status(500).send('토큰 생성 에러');
  res.json({ token });
}

async function signIn(user, req, res) {
  const bMatch = await bcrypt.compare(req.body.password, user.password);
  if (bMatch) {
    const payload = {
      userid: user.userid,
      username: user.username,
    };
    const token = await jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: '1d' },
      (err, token) => checkTokenError(err, token, res)
    );
  } else {
    res.status(401).send('비밀번호가 일치하지 않음');
  }
}

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.body.userid });
    if (user) {
      signIn(user, req, res);
    }
  } catch {
    res.status(401).send('데이터베이스에 일치하는 아이디 정보 없음.');
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
  const token = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { expiresIn: '1d' },
    (err, token) => checkTokenError( err, token, res)
  );
  res.json({ token });
}

router.post('/signup', async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.body.userid });
    if (user) {
      res.send(401).send('중복된 아이 존재');
    } else {
      signUp(user, req, res);
    }
  } catch {
    res.send(500).send('서버단 회원가입 에러가 발생했음');
  }
});

module.exports = router;
