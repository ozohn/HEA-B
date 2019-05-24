import { User } from "../../../../model/user";

export default {
  Query: {
    searchWork: async (_, args) => {
      const { term } = args;
      const pattern = new RegExp(term);
      return await User.find({
        "works.worktitle": pattern
      });
    }
  }
};
