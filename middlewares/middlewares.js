const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  const authHeader = req.get('authorization');
  if (authHeader) {
    checkAuth(authHeader, req, next);
  } else {
    next();
  }
}

function checkAuth(header, req, next) {
  const token = header.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      checkVerify(err, user, req, next);
    })
  } else {
    next();
  }
}

function checkVerify(err, user, req, next) {
  if (err) {
    console.log(err);
  }
  req.user = user;
  next();
}

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    const error = new Error('Un-Authorized');
    res.sendState(401);
    next(error);
  }
}

module.exports = {
  checkToken,
  isLoggedIn,
};
