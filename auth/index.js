const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const db = require("../db/connection.js");
const users = db.get("users");
users.createIndex("username", { unique: true });

const router = express.Router();

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9]+$)/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string()
    .min(10)
    .trim()
    .required()
});

function createToken(user, res, next) {
  const payload = {
    _id: user._id,
    username: user.username
  };
  jwt.sign(
    payload,
    user.password,
    {
      expiresIn: "1d"
    },
    (err, token) => {
      if (err) {
        respondError422(res, next);
      } else {
        res.json({
          token
        });
      }
    }
  );
}

// any route in here is pre-pended with /auth

router.get("/", (req, res) => {
  res.json({
    message: "Auth router is working!!"
  });
});

// localhost/auth/signup
router.post("/signup", (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    // make sure username is unique
    users
      .findOne({
        username: req.body.username
      })
      .then(user => {
        // if user is undefined, username is not in the db,
        // otherwise, duplicate user
        if (user) {
          // there is already a user in the db with this username ...
          // respond with an error!
          const error = new Error("Please choose another username.");
          next(error);
        } else {
          // hash the password
          // insert the user with the hashed password
          bcrypt.hash(req.body.password.trim(), 12).then(hashedPassword => {
            const newUser = {
              username: req.body.username,
              password: hashedPassword
            };

            users.insert(newUser).then(insertedUser => {
              delete insertedUser.password;
              res.json(insertedUser);
            });
          });
        }
      });
  } else {
    // res.json(result);
    next(result.error);
  }
});

function respondError422(res, next) {
  res.status(422);
  const error = new Error("Unable to login.");
  next(error);
}

router.post("/signin", (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    users
      .findOne({
        username: req.body.username
      })
      .then(user => {
        if (user) {
          bcrypt.compare(req.body.password, user.password).then(result => {
            if (result) {
              createToken(user, res, next);
            } else {
              respondError422(res, next);
            }
          });
        } else {
          respondError422(res, next);
        }
      });
  } else {
    respondError422(res, next);
  }
});
module.exports = router;
