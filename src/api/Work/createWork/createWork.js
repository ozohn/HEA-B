import Work from "../../../../model/work";

export default {
  Mutation: {
    createWork: async (_, args, { request, isAuthenticated }) => {
      // isAuthenticated(request);
      // const { user } = request;
      const { worktitle, workdesc, workimage } = args;
      const query = {
        worktitle: req.body.worktitle,
        workimage: req.body.workimage,
        workdesc: req.body.workdesc,
        userid: req.user.userid
      };
      const work = new Work(query);
      await work.save();
      // const works = await Work.find({ userid: req.user.userid });
      return true;
    }
  }
};
