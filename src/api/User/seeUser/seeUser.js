import { User } from "../../../../model/user";

export default {
  Query: {
    seeUser: async (_, args) => {
      return await User.findOne({ userid: args.userid });
    }
  }
};
