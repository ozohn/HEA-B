const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const indexRouter  = require('./routes/index.js');
const usersRouter  = require('./routes/users.js');

app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(process.env.PORT || 3000);