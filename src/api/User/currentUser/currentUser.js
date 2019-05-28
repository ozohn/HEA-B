import { User } from '../../../../model/user';

export default {
  Query: {
    currentUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated({ request });
      const { user } = request;
      return await User.findOne({ userid: user.userid });
    }
  }
};
