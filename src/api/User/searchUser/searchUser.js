import { User } from "../../../../model/user";

export default {
  Query: {
    searchUser: async (_, { term }) => {
      const pattern = new RegExp(term);
      return await User.find({ username: pattern });
    }
  }
};
