import Work from "../../../../model/work";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { workid, worktitle, workdesc, workimage } = args;
      const updateData = { worktitle, workdesc, workimage };
      const query = { workid };
      if (action === EDIT) {
        return await Work.findOneAndUpdate(query, updateData);
      } else if (action === DELETE) {
        return await Work.findOneAndRemove(query);
      }
    }
  }
};
