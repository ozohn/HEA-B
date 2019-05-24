import { User } from "../../../../model/user";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      // isAuthenticated(request);
      const { userid, username, userimage, userdesc } = args;
      const query = { userid };
      await User.findOneAndUpdate(query, {
        $set: {
          userid,
          username,
          userimage,
          userdesc
        }
      });
      return await User.findOne(query);
    }
  }
};
