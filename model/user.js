import mongoose from 'mongoose';
import { workSchema } from './work';

const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userimage: {
    type: String
  },
  userdesc: {
    type: String
  },
  works: {
    type: [workSchema]
  }
});
const User = mongoose.model('User', userSchema);

export { User, userSchema };
