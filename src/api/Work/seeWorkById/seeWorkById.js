import { Work } from "../../../../model/work";

export default {
  Query: {
    seeWorkById: async (_, args) => {
      const { workid } = args;
      const query = { _id: workid };
      return await Work.findOne(query);
    }
  }
};
