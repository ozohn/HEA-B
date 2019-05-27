import express from 'express';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';

const users = [
  {
    id: 'john0123',
    pw: 'something01@#',
    name: '',
    desc: '',
    works: []
  }
];

const TOKEN_SECRET = process.env.TOKEN_SECRET;

console.log(jwt.sign(users[0], TOKEN_SECRET));

const { Strategy, ExtractJwt } = passportJWT;

const params = {
  secretOrKey: TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const strategy = new Strategy(params, (payload, done) => {
  console.log(payload);
  const user = users.find(user => user.id === payload.id) || null;
  return done(null, user);
});

passport.use(strategy);
passport.initialize();

const app = express();

app.use('/', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user;
    }
    console.log(user);
    next();
  })(req, res, next);
});
