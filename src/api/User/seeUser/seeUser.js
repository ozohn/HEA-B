import { User } from "../../../../model/user";

export default {
  Query: {
    seeUser: async (_, args, { request }) => {
      const { user } = request;
      return await User.findOne({ userid: user.userid });
    }
  }
};
