const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./model/user.js');

const getQurey = req => {
  return { userid: req.user.userid };
};

const updateData = user => {
  return {
    userimage: user.userimage,
    userdesc: user.userdesc,
    username: user.username
  };
};

const checkTokenError = (err, token, res) => {
  if (err) res.sendStatus(500).send('토큰 생성 에러');
  res.json({ token });
};

const signIn = async (user, req, res) => {
  const bMatch = await bcrypt.compare(req.body.password, user.password);
  if (bMatch) {
    const payload = {
      userid: user.userid,
      username: user.username
    };
    const token = await jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: '1d' },
      (err, token) => checkTokenError(err, token, res)
    );
  } else {
    res.status(401).send({ message: '비밀번호 틀림' });
  }
};

const signUp = async (user, req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password.trim(), 12);
  user = new User({
    userid: req.body.userid,
    password: hashedPassword,
    username: req.body.username
  });
  const newUser = await user.save();
  const payload = {
    userid: newUser.userid,
    username: newUser.username
  };
  const token = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { expiresIn: '1d' },
    (err, token) => checkTokenError(err, token, res)
  );
};

module.exports = { getQurey, updateData, signIn, signUp };
