import { Work } from "../../../../model/work";

export default {
  Mutation: {
    seeWork: async (_, args) => {
      const query = { _id: args.workid };
      return await Work.findOne(query);
    }
  }
};
