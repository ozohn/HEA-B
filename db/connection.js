const mongoose = require('mongoose');

const connectDB = () => {
  const databaseUrl =
    'mongodb+srv://hsens:hsens@practicedb-wrdgo.mongodb.net/hsens?retryWrites=true';
  mongoose.Promise = global.Promise;
  mongoose.connect(databaseUrl, { useNewUrlParser: true });

  database = mongoose.connection;

  database.on(
    'open',
    () => {
      console.log(`database 연결됨 : ${databaseUrl}`)

      userSchema = mongoose.Schema({
        id: String,
        username: String,
        password: String,
      });
      console.log(`schema 정의`);
      
      userModel = mongoose.model('users', userSchema);
      console.log(`userModel 정의`);
    }
  )
  
  database.on(
    'disconnected', //db 연결 끊길떄
    function() {
      console.log('data base 연결 끊어짐');
    }
  );

  database.on(
    'error', //에러 발생하는 경우
    console.error.bind(console, 'mongoose 연결 에러')
  );
};

const db = connectDB();
//model, 처리잘하기.
module.exports = db;
