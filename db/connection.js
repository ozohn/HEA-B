const monk = require("monk");
const db = monk("localhost/auth-for-noobs");
//model, 처리잘하기.
module.exports = db;
