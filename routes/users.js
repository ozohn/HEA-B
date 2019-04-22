if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();

const User = require('../model/user.js');
const _u = require('../util.js');

router.get('/', function(req, res) {
  res.send('Hello');
});

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.body.userid });
    if (user) {
      _u.signIn(user, req, res);
    } else {
      res.status(401).send({ message: '아이디 존재 x' });
    }
  } catch {
    res.sendStatus(401);
  }
});

router.post('/checkid', async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.body.userid });
    if (user) {
      res.send({ message: '중복 아이디 존재' });
    } else {
      res.status(200).send({ message: 'OK' });
    }
  } catch {
    res.sendStatus(500).send('서버단 에러 발생');
  }
});

router.post('/signup', async (req, res) => {
  try {
    const user = await User.findOne({ userid: req.body.userid });
    if (user) {
      res.sendStatus(401).send('중복된 아이디 존재');
    } else {
      _u.signUp(user, req, res);
    }
  } catch {
    res.sendStatus(500).send('서버단 회원가입 에러가 발생했음');
  }
});

module.exports = router;
