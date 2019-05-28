import { User } from "../../../../model/user";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated({ request });
      const { user } = request;
      const { username, userimage, userdesc } = args;
      const query = { userid: user.userid };
      return await User.findOneAndUpdate(query, {
        $set: {
          username,
          userimage,
          userdesc
        }
      });
    }
  }
};
