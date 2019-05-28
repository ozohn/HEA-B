import { User } from '../../../../model/user';
import { Work } from '../../../../model/work';

export default {
  Mutation: {
    createWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated({ request });
      const { worktitle, workdesc, workimage, userid } = args;
      const work = new Work({
        worktitle: worktitle,
        workdesc: workdesc,
        workimage: workimage,
        userid: userid
      });
      const query = { userid: userid };
      await work.save();
      const user = await User.findOne(query);
      await User.findOneAndUpdate(query, {
        $set: { works: [...user.works, work] }
      });
      return work;
    }
  }
};
