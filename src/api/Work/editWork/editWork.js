import { Work } from "../../../../model/work";
import { User } from "../../../../model/user";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated({ request });
      const { workid, worktitle, workdesc, workimage, action } = args;
      const updateData = { worktitle, workdesc, workimage };
      const query = { _id: workid };
      if (action === EDIT) {
        await Work.findOneAndUpdate(
          { _id: workid },
          {
            $set: { worktitle, workdesc, workimage }
          }
        );
        await User.findById(request.user.id, async (err, user) => {
          const work = user.works.id(workid);
          work.set({ worktitle, workdesc, workimage });
          await user.save();
        });
        return updateData;
      } else if (action === DELETE) {
        return await User.findOneAndRemove(query);
      }
    }
  }
};
