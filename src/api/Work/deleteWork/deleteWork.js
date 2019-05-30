import { User } from "../../../../model/user";
import { Work } from "../../../../model/work";

export default {
  Mutation: {
    deleteWork: async (_, args, { request }) => {
      const { workid } = args;
      const query = { _id: workid };
      const work = await Work.findOneAndRemove(query);
      const user = await User.findById(request.user.id, async (err, user) => {
        const work = user.works.id(workid);
        work.remove();
        await user.save();
      });
      if (work && user) return true;
      return false;
    }
  }
};
