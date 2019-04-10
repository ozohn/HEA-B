const express = require('express');
const router = express.Router();
const User = require("../model/user.js");

router.get('/', function (req, res) {
    res.send('Hello');
})
router.post('/signin', async (req, res) => {
    let searchOptions = {};
    if(req.body.userid !== null && req.body.userid !== ''){
        searchOptions.userid = req.body.userid;
        searchOptions.password = req.body.password;
    }
    try {
        const users = await User.find(searchOptions);
        res.json({
            "done": "signin",
            users: users
        });
    } catch {
        res.json({"err": "signin error"});
    }
})
router.post('/signup', async (req, res) => {
    const user = new User({
        userid: req.body.userid,
        password: req.body.password,
        username: req.body.username
    });
    
    try {
        const newUser = await user.save();
        res.json({done: 'signup'})
    } catch {
        res.json({error: 'signup error'})
    }
})

module.exports = router;