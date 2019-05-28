import { Work } from "../../../../model/work";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editWork: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated({ request });
      const { worktitle, workdesc, workimage, action } = args;
      const updateData = { worktitle, workdesc, workimage };
      const query = { workid };
      if (action === EDIT) {
        return await Work.findOneAndUpdate(query, {
          $set: { worktitle, workdesc, workimage }
        });
      } else if (action === DELETE) {
        return await User.findOneAndRemove(query);
      }
    }
  }
};
