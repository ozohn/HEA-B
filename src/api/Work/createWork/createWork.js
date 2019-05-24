import { User } from "../../../../model/user";

export default {
  Mutation: {
    createWork: async (_, args, { request, isAuthenticated }) => {
      // isAuthenticated(request);
      const query = { userid: args.userid };
      const { worktitle, workdesc, workimage } = args;
      return await User.findOneAndUpdate(query, {
        $set: { works: { worktitle, workimage, workdesc } }
      });
    }
  }
};
