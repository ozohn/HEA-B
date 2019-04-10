const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Hello');
})
router.post('/signin', (req, res) => {
    
})
router.post('/signup', (req, res) => {
    
})

module.exports = router;