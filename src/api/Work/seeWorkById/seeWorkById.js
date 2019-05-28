import { Work } from '../../../../model/work';

export default {
  Query: {
    seeWorkById: async (_, args) => {
      const { id } = args;
      const query = { _id: id };
      return await Work.findOne(query);
    }
  }
};
