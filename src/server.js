import dotenv from 'dotenv';
dotenv.config();
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import { checkToken, isLoggedIn } from './middleware';
// import passport from './middleware';
// console.log(passport);
// passport.initialize();

const PORT = process.env.PORT || 5000;
const server = new GraphQLServer({
  schema,
  context: ({ request, response }) => {
    const check = checkToken(request, response);
    console.log(check);
    // request.headers.authorization;
    // passport.authenticate('jwt', { session: false }, (err, user, info) => {
    //   if (user) {
    //     request.user = user;
    //   }
    // })(request);
  }
});

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

server.express.use(logger('dev'));

server.start({ port: PORT }, () => console.log(`Server running on port ${PORT}`));
