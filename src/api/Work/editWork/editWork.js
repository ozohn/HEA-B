import { User } from "../../../../model/user";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated({ request });
      const { worktitle, workdesc, workimage, userid, action } = args;
      const updateData = { workdesc, workimage };
      const query = { userid };
      if (action === EDIT) {
        return await User.findOne(query, (err, user) => {
          user.works.forEach(work => {
            if (work.worktitle === worktitle) {
              work = { ...work, ...updateData };
            }
          });
        });
      } else if (action === DELETE) {
        return await User.findOneAndRemove(query);
      }
    }
  }
};
