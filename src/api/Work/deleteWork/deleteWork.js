import { Work } from "../../../../model/work";

export default {
  Mutation: {
    deleteWork: async (_, args) => {
      const query = { _id: args.workid };
      const work = await Work.findOneAndRemove(query);
      if (work) return true;
      return false;
    }
  }
};
