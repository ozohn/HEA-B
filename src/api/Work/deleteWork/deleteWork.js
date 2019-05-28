import { Work } from "../../../../model/work";

export default {
  Mutation: {
    deleteWork: async (_, args) => {
      const query = { _id: args.workid };
      return await Work.findOneAndRemove(query);
    }
  }
};
