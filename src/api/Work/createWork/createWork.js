import { User } from "../../../../model/user";
import { Work } from "../../../../model/work";

export default {
  Mutation: {
    createWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated({ request });
      const { worktitle, workdesc, workimage } = args;
      const work = new Work({ worktitle, workdesc, workimage });
      const query = { userid: request.user.userid };
      await work.save();
      await User.findOneAndUpdate(query, {
        $set: { works: [...request.user.works, work] }
      });
      return work;
    }
  }
};
