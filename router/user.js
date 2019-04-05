const express = require('express');
const db = require('../db/connection.js');
const users = db.get('users');

const router = express.Router();

router.get('/user', (req, res) => {
  users.findOne({username: req.body.username}).then(user => res.send(user));
});

module.exports = router