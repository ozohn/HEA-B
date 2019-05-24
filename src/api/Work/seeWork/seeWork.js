import { User } from "../../../../model/user";

export default {
  Query: {
    seeWork: async (_, args, { request, isAuthenticated }) => {
      const { userid } = args;
      const query = { userid };
      return await User.findOne(query);
    }
  }
};
