import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../model/user";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const params = {
  secretOrKey: TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const verifyUser = async (patload, done) => {
  try {
    const user = await User.findOne({ userid: payload.userid });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateToken = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(params, verifyUser));
passport.initialize();
