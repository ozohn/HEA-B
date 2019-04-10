const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../model/user.js");

function createToken(user, res, next) {
    const payload = {
      userid: user.userid,
      username: user.username
    };
  
    jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: '1d'
    }, (err, token) => {
      if (err) {
        respondError422(res, next);
      } else {
        res.json({
          token
        });
      }
    });
  }

router.get('/', function (req, res) {
    res.send('Hello');
})
router.post('/signin', (req, res) => {
    let searchOptions = {};
    if(req.body.userid !== null && req.body.userid !== ''){
        searchOptions.userid = req.body.userid;
        searchOptions.password = req.body.password;
    }
    try {
        const user = await User.findOne(searchOptions);
        if(user){
            const bMatch = await bcrypt.compare(req.body.password, user.password);
            if(bMatch){
                createToken(user, res, next);
                res.json({
                    "done": "signin",
                    author: author
                });
            } else {
                res.json({ error: '비밀번호가 틀립니다.'})
            }
        }
    } catch {
        res.json({"err": "signin error"});
    }
})
router.post('/signup', async (req, res) => {
    try {
        const user = await User.findOne({ userid: req.body.userid });
        if(user) {
            res.json({error: '중복된 아이디가 있습니다.'});
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password.trim(), 12);
            const user = new User({
                userid: req.body.userid,
                password: hashedPassword,
                username: req.body.username
            });
            const newUser = await user.save();
            createToken(newUser, res, next)
            res.json({done: 'signup'})
        }
    }  catch  {
        res.json({ error: "signin error"});
    }
})

module.exports = router;