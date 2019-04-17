if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const router = express.Router();

module.exports = router;