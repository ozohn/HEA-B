const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import { User } from '../../../../model/user';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    signIn: async (_, args) => {
      const { userid, password } = args;
      const user = await User.findOne({ userid });
      if (user === null) return 'notFound';
      const bMatch = await bcrypt.compare(password, user.password);
      if (bMatch) {
        const payload = {
          userid: user.userid
        };
        const token = await generateToken(payload);
        return token;
      }
      return 'notFound';
    }
  }
};
