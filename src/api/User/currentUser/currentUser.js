import { User } from '../../../../model/user';

export default {
  Query: {
    currentUser: async (_, args, { request, isAuthenticated }) => {
      // isAuthenticated(request);
      const { userid, username, userimage, userdesc } = args;
      const query = { userid };
      return await User.findOne({ userid: 'hsens00' });
    }
  }
};
