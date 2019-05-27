import dotenv from 'dotenv';
dotenv.config();
// import passport from 'passport';
// import passportJWT from 'passport-jwt';
import User from '../model/user';
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// const { Strategy, ExtractJwt } = passportJWT;

// const params = {
//   secretOrKey: TOKEN_SECRET,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
// };

// const strategy = new Strategy(params, (payload, done) => {
//   console.log(payload);
//   User.findOne({ userid: payload.userid }, (err, user) => {
//     if (err) {
//       return done(err, false);
//     }
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   });
// });

// passport.use(strategy);

// export default passport;

const jwt = require('jsonwebtoken');

function checkToken(req) {
  const authHeader = req.get('authorization');
  if (authHeader) {
    return checkAuth(authHeader);
  }
  return null;
}

function checkAuth(header) {
  const token = header.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      return checkVerify(err, user);
    });
  }
  return null;
}

function checkVerify(err, user) {
  if (err) {
    return err;
  } else {
    return user;
  }
}

export { checkToken };
