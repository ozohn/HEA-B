if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');

const middlewares = require('./middlewares/middlewares.js');

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const creatorRouter = require('./routes/creator.js');
const mainRouter = require('./routes/main.js');
const searchRouter = require('./routes/search.js');

app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(express.json());
app.use(cors());
app.use(middlewares.checkToken);

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/creator', creatorRouter);
app.use('/main', mainRouter);
app.use('/search', searchRouter);

app.listen(process.env.PORT || 5000);
