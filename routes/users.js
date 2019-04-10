const express = require('express');
const router = express.Router();
const User = require("../model/user.js");

router.get('/', function (req, res) {
    res.send('Hello');
})
router.post('/signin', (req, res) => {

})
router.post('/signup', async (req, res) => {
    const user = new User({
        userId: req.body.id,
        password: req.body.password,
        username: req.body.name
    })
    try {
        const newUser = await user.save();
        res.redirect('/');
    } catch {
        res.json({error: 'signup error'})
    }
})

module.exports = router;